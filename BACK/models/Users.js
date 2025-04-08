const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "This username is already on use"],
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "This email is already on use"],
    },
    avatar: {
        type: String,
        default: "default.jpg",
    },
    date: {
        type: Date,
        default: Date.now,
    },
    me: {
        type: Boolean,
        default: false,
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