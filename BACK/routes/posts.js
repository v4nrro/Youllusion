const express = require("express");

const {
    getAllPosts,
    getPostById,
    postPost,
    putPost,
    deleteByAuthor,
    deleteByAdmin,
    getLikedPosts,
    addOrRemoveLike,
    addOrRemoveDislike,
} = require("../controllers/postsController.js");
const { authenticate, role, optionalAuthenticate } = require("../middleware/auth.js");
const { videoImageUpload, imageUpload } = require("../utils/multer.js");

const router = express.Router();

router.get("/", getAllPosts);
router.get("/liked", authenticate, getLikedPosts);
router.get("/:id", optionalAuthenticate, getPostById);

router.post("/like/:id", authenticate, addOrRemoveLike);
router.post("/dislike/:id", authenticate, addOrRemoveDislike);

router.post(
    "/",
    authenticate,
    videoImageUpload.fields([
        { name: "post", maxCount: 1 },
        { name: "miniature", maxCount: 1 },
    ]),
    postPost
);

router.put("/:id", authenticate, imageUpload.single('miniature'), putPost);

router.delete("/post-delete/:id", authenticate, deleteByAuthor);
router.delete("/:id",authenticate, role(['admin']), deleteByAdmin);

module.exports = router;
