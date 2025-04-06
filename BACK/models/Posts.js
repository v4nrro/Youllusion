const mongoose = require("mongoose");

let postSchema = new mongoose.Schema({ 
    post: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    ],
    dislikes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comments",
        },
    ],
    tags: [
        {
            type: String,
        },
    ],
    miniature: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    },
});

let postModel = mongoose.model("posts", postSchema);

module.exports = postModel;