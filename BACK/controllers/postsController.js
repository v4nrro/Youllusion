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

module.exports = {
    getAllPosts,
    getPostsByAuthor,
    getPostById,
};