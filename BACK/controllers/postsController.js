const Posts = require("../models/Posts");
const Users = require("../models/Users")

const getAllPosts = async (req, res) => {
    try {
        const posts = await Posts
            .find()
            .populate("author", "username avatar subscibers")
            .populate("comments", "text author date likes dislikes");

        res.status(200).json({ message: "Posts fetched successfully", posts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFreePosts = async (req, res) => {
    try {
        const posts = await Posts
            .find({ price: 0 })
            .populate("author", "username avatar subscibers")
            .populate("comments", "text author date likes dislikes");
    
        res.status(200).json({ message: "Posts fetched successfully", posts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPaidPosts = async (req, res) => {
    try {
        const posts = await Posts
            .find({ price: { $gt: 0 } })
            .populate("author", "username avatar subscibers")
            .populate("comments", "text author date likes dislikes");
    
        res.status(200).json({ message: "Posts fetched successfully", posts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await Posts
            .findById(req.params.id)
            .populate("author", "username")
            .populate("comments", "text author date likes dislikes");

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
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

        res.status(200).json({ message: "Post created successfully", savedPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const putPost = async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);

        const { title, description, tags, price } = req.body;

        if (!req.files.post || !title || !description || !req.files.miniature) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        if(post.author == req.user.userId){
            const updatedPost = await Posts.findByIdAndUpdate(
                req.params.id,
                { 
                    post: process.env.API_URL + '/uploads/videos/' + req.files.post[0].filename,
                    title,
                    description,
                    author: req.user.userId,
                    tags,
                    miniature: process.env.API_URL + '/uploads/images/' + req.files.miniature[0].filename,
                    price 
                },
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

module.exports = {
    getAllPosts,
    getPostById,
    postPost,
    putPost,
    deleteByAdmin,
    deleteByAuthor,
    getFreePosts,
    getPaidPosts,
};