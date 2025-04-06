const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "default.jpg",
    },
    date: {
        type: Date,
        default: Date.now,
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "posts",
        },
    ],
    subscriptions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    ],
    subscribers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    ],
});

let userModel = mongoose.model("users", userSchema);

module.exports = userModel;