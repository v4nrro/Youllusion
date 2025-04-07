const express = require("express");

const { getAllPosts, getPostsByAuthor, getPostById, postPost, putPost, deletePost } = require("../controllers/postsController.js");
const { authenticate } = require("../middleware/auth.js");

const router = express.Router();

router.get("/", getAllPosts);
router.get("/author/:id", getPostsByAuthor);
router.get("/:id", getPostById);
router.post("/", authenticate, postPost);
router.put("/:id", putPost);
router.delete("/:id", deletePost);

module.exports = router;
