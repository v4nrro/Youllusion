const mongoose = require('mongoose');

let commentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
    ],
    dislikes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
    ],
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
        required: true,
    },
})

let commentModel = mongoose.model('comments', commentSchema);

module.exports = commentModel;