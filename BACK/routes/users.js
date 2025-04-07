const express = require('express');

const { getAllPosts, getPostsByAuthor, getPostById } = require("../controllers/usersController.js");

const router = express.Router();

// Write here the routes for users

module.exports = router;