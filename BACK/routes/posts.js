const express = require("express");

const { getAllPosts, getPostsByAuthor, getPostById } = require("../controllers/postsController.js");

const router = express.Router();

router.get("/", getAllPosts);
router.get("/author/:id", getPostsByAuthor);
router.get("/:id", getPostById);

module.exports = router;
