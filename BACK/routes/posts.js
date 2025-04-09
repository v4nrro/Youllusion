const express = require("express");
const fileUpload = require("../utils/multer");

const {
    getAllPosts,
    getPostsByAuthor,
    getPostById,
    postPost,
    putPost,
    deletePost,
    deleteByAuthor,
} = require("../controllers/postsController.js");
const { authenticate } = require("../middleware/auth.js");

const router = express.Router();

router.get("/", getAllPosts);
router.get("/author/:id", getPostsByAuthor);
router.get("/:id", getPostById);

router.post(
    "/",
    authenticate,
    fileUpload.fields([
        { name: "post", maxCount: 1 },
        { name: "miniature", maxCount: 1 },
    ]),
    postPost
);

router.put("/:id", putPost);
router.delete("/author-delete/:id", authenticate, deleteByAuthor);

//TODO THIS MIGHT BE ONLY FOR ADMINS
router.delete("/:id", deletePost);

module.exports = router;
