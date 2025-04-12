const express = require("express");

const {
    getAllPosts,
    getPostsByAuthor,
    getPostById,
    postPost,
    putPost,
    deleteByAuthor,
    deleteByAdmin,
} = require("../controllers/postsController.js");
const { authenticate, role } = require("../middleware/auth.js");
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
router.delete("/:id",authenticate, role(['admin']), deleteByAdmin);

module.exports = router;
