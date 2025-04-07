const express = require('express');

const { getAllPosts, getPostsByAuthor, getPostById, postUser } = require("../controllers/usersController.js");

const router = express.Router();

router.post("/", postUser);

// Write here the routes for users

module.exports = router;