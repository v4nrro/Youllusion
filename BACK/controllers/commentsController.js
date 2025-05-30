const Comments = require('../models/Comments');
const Posts = require('../models/Posts');

const getComments = async (req, res) => {
    try {
        const postId = req.params.id;

        const comments = await Comments.find({ post: postId })
            .populate('author');

        if (!comments) {
            return res.status(404).json({ message: "No comments found" });
        }

        return res.status(200).json({ message: "Comments found", comments});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const addOrRemoveLike = async (req, res) => {
    try {
        const comment = await Comments.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        const userId = req.user.userId;
        const isLiked = comment.likes.includes(userId);
        const isDisliked = comment.dislikes.includes(userId);

        if (isLiked) {
            comment.likes = comment.likes.filter((id) => id.toString() !== userId);
        }

        if (isDisliked) {
            comment.dislikes = comment.dislikes.filter((id) => id.toString() !== userId);
        }

        if (!isLiked) {
            comment.likes.push(userId);
        }

        await comment.save();

        res.status(200).json({ message: "Comment liked successfully", comment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addOrRemoveDislike = async (req, res) => {
    try {
        const comment = await Comments.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        const userId = req.user.userId;
        const isLiked = comment.likes.includes(userId);
        const isDisliked = comment.dislikes.includes(userId);

        if (isLiked) {
            comment.likes = comment.likes.filter((id) => id.toString() !== userId);
        }

        if (isDisliked) {
            comment.dislikes = comment.dislikes.filter((id) => id.toString() !== userId);
        }

        if (!isDisliked) {
            comment.dislikes.push(userId);
        }

        await comment.save();

        res.status(200).json({ message: "Comment disliked successfully", comment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const postComment = async (req, res) => {
    try {
        const { text } = req.body;
        const author = req.user.userId;
        const post = req.params.id;

        if (!text || !author) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newComment = new Comments({
            author,
            text,
            post,
        });

        const savedComment = await newComment.save();

        await Posts.findByIdAndUpdate(
            post,
            { $push: {comments: savedComment._id}}
        );

        return res.status(200).json({ message: "Comment saved succesfully", savedComment });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deleteComment = async (req, res) => {
    try {
        const userId = req.user.userId;

        const comment = await Comments.findById(req.params.id);

        if(!comment){
            return res.status(404).json({ message: "Comment not found" })
        }

        const post = await Posts.findById(comment.post);

        if(userId == comment.author || userId == post.author){
            await Comments.findByIdAndDelete(req.params.id);

            return res.status(200).json({ message: "Comment deleted succesfully" })
        }
        
        return res.status(401).json({ message: "You can't delete a comment that isn't yours or in your post" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    deleteComment,
    postComment,
    getComments,
    addOrRemoveLike,
    addOrRemoveDislike,
};