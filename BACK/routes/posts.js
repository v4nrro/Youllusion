const express = require("express");

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
const { videoImageUpload } = require("../utils/multer.js");

const router = express.Router();

router.get("/", getAllPosts);
router.get("/author/:id", getPostsByAuthor);
router.get("/:id", getPostById);

router.post(
    "/",
    authenticate,
    videoImageUpload.fields([
        { name: "post", maxCount: 1 },
        { name: "miniature", maxCount: 1 },
    ]),
    postPost
);

router.put(
    "/:id",
    authenticate,
    videoImageUpload.fields([
        { name: "post", maxCount: 1 },
        { name: "miniature", maxCount: 1 },
    ]),
    putPost
);
router.delete("/author-delete/:id", authenticate, deleteByAuthor);

//TODO THIS MIGHT BE ONLY FOR ADMINS
router.delete("/:id", deletePost);

module.exports = router;
