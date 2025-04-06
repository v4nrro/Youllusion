const express = require('express');

const { getAllPosts, getPostsByAuthor, getPostById } = require("../controllers/commentsController.js");

const router = express.Router();



module.exports = router;