const Posts = require("../models/Posts");
const Users = require("../models/Users")
const nodemailer = require('nodemailer')

require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})

const getAllPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) -1 || 0;
        const limit = parseInt(req.query.limit) || 12;
        const search = req.query.search || '';
        const filter = req.query.filter || '';
        const price = 0;

        let query = {
            title: { $regex: search, $options: 'i' }
        };

        if (filter === 'free') {
            query.price = 0;
        } else if (filter === 'paid') {
            query.price = { $gt: 0 };
        }

        const posts = await Posts
            .find(query)
            .skip(page * limit)
            .limit(limit)
            .populate("author", "username avatar subscibers")

        res.status(200).json(
            {
                message: "Posts fetched successfully",
                page: page + 1,
                limit, 
                posts 
            }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await Posts
            .findById(req.params.id)
            .populate("author", "username avatar subscribers subscribed")
            .populate({
                path: "comments",
                select: "text author date likes dislikes",
                populate: {
                    path: "author",
                    select: "username avatar",
                }
            });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if(req.user) {
            const author = await Users.findById(post.author);

            isSubscribed = author.subscribers.includes(req.user.userId);
            isLiked = post.likes.includes(req.user.userId);
            isDisliked = post.dislikes.includes(req.user.userId);

            post.liked = isLiked;
            post.disliked = isDisliked;

            author.subscribed = isSubscribed;
        }

        res.status(200).json({ message: "Post fetched successfully", post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const postPost = async (req, res) => {
    try {
        const { title, description, tags, price } = req.body;

        if (!req.files.post || !req.files.miniature || !title || !description) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newPost = new Posts({
            post: process.env.API_URL + '/uploads/videos/' + req.files.post[0].filename,
            miniature: process.env.API_URL + '/uploads/images/' + req.files.miniature[0].filename,
            title,
            description,
            author: req.user.userId,
            tags,
            price,
        });

        const savedPost = await newPost.save();

        await Users.findByIdAndUpdate(savedPost.author, {
            $push: { posts: savedPost._id },
        });

        // Creating and sending emails to subs
        const author = await Users.findById(savedPost.author);

        author.subscribers.forEach(async (subscriber) => {
            const user = await Users.findById(subscriber);

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: `Nuevo vídeo de ${author.username}!`,
                text: `${author.username} ha subido un nuevo vídeo, ve a verlo en Youllusion.com`
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if(error) {
                    return res.status(500).json({ message: "Error sending emails ", error });
                }
            })
        });

        res.status(200).json({ message: "Post created successfully", savedPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addOrRemoveLike = async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const userId = req.user.userId;
        const isLiked = post.likes.includes(userId);
        const isDisliked = post.dislikes.includes(userId);

        if (isLiked) {
            post.likes = post.likes.filter((id) => id.toString() !== userId);
        }

        if (isDisliked) {
            post.dislikes = post.dislikes.filter((id) => id.toString() !== userId);
        }

        if (!isLiked) {
            post.likes.push(userId);
        }

        await post.save();

        res.status(200).json({ message: "Post liked successfully", post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addOrRemoveDislike = async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const userId = req.user.userId;
        const isLiked = post.likes.includes(userId);
        const isDisliked = post.dislikes.includes(userId);

        if (isLiked) {
            post.likes = post.likes.filter((id) => id.toString() !== userId);
        }

        if (isDisliked) {
            post.dislikes = post.dislikes.filter((id) => id.toString() !== userId);
        }

        if (!isDisliked) {
            post.dislikes.push(userId);
        }

        await post.save();

        res.status(200).json({ message: "Post disliked successfully", post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const putPost = async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);

        const { title, description, tags, price } = req.body;

        if ( !title || !description ) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        if(post.author == req.user.userId){
            const updatedFields = {
                title,
                description,
                author: req.user.userId,
                tags,
                price,
            };

            if (req.file) {
                updatedFields.miniature = process.env.API_URL + '/uploads/images/' + req.file.filename;
            }

            const updatedPost = await Posts.findByIdAndUpdate(
                req.params.id,
                updatedFields,
                { new: true }
            ); 

            if (!updatedPost) {
                return res.status(404).json({ message: "Post not found" });
            }
    
            return res.status(200).json({ message: "Post updated successfully", updatedPost });
        }

        res.status(401).json({ message: "You cannot update a post that isn't yours" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteByAdmin = async (req, res) => {
    try {
        const deletedPost = await Posts.findByIdAndDelete(req.params.id);

        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Post deleted successfully", deletedPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteByAuthor = async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if(post.author == req.user.userId){
            const deletedPost = await Posts.findByIdAndDelete(req.params.id);

            return res.status(200).json({ message: "Post deleted successfully", deletedPost });
        }

        res.status(401).json({ message: "You cannot delete a post that isn't yours" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getLikedPosts = async (req, res) => {
    try {
        const posts = await Posts
            .find({ likes: { $in: [req.user.userId] } })
            .populate("author", "username avatar subscibers");

        res.status(200).json({ message: "Posts fetched successfully", posts: posts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllPosts,
    getPostById,
    postPost,
    putPost,
    deleteByAdmin,
    deleteByAuthor,
    getLikedPosts,
    addOrRemoveLike,
    addOrRemoveDislike,
};