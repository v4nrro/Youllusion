const Posts = require("../models/Posts");

const getAllPosts = async (req, res) => {
    try {
        const posts = await Posts
            .find()
            .populate("author", "username")
            .populate("comments", "text author date likes dislikes");

        res.status(200).json({ message: "Posts fetched successfully", posts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPostsByAuthor = async (req, res) => {
    try {
        const posts = await Posts
            .find({ author: req.params.id })
            .populate("author", "username")
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
        const { post, title, description, author, tags, miniature, price } = req.body;

        if (!post || !title || !description || !author || !miniature) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newPost = new Posts({
            post,
            title,
            description,
            author,
            tags,
            miniature,
            price,
        });

        const savedPost = await newPost.save();

        res.status(200).json({ message: "Post created successfully", savedPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const putPost = async (req, res) => {
    try {
        const { post, title, description, author, tags, miniature, price } = req.body;

        if (!post || !title || !description || !author || !miniature) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const updatedPost = await Posts.findByIdAndUpdate(
            req.params.id,
            { post, title, description, author, tags, miniature, price },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Post updated successfully", updatedPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deletePost = async (req, res) => {
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

module.exports = {
    getAllPosts,
    getPostsByAuthor,
    getPostById,
    postPost,
    putPost,
    deletePost,
};