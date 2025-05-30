const express = require("express");

const {
    getLoggedUser,
    getAllUsers,
    getUserById,
    deleteByAdmin,
    deleteByMe,
    putCredentials,
    putAvatar,
    putPassword,
    getSubscriptions,
    addOrRemoveSubscription,
} = require("../controllers/usersController.js");
const { authenticate, role, optionalAuthenticate } = require("../middleware/auth.js");
const { imageUpload } = require("../utils/multer.js");

const router = express.Router();


router.get("", authenticate, role(["admin"]), getAllUsers);
router.get("/me", authenticate, getLoggedUser);
router.get("/subscriptions", authenticate, getSubscriptions);
router.get("/:id", optionalAuthenticate, getUserById);

router.post("/subscribe/:id", authenticate, addOrRemoveSubscription);

router.put("/me/credentials", authenticate, putCredentials);
router.put("/me/avatar", authenticate, imageUpload.single("avatar"), putAvatar);
router.put("/me/password", authenticate, putPassword);

router.delete("/me", authenticate, deleteByMe);
router.delete("/:id", authenticate, role(["admin"]), deleteByAdmin);
module.exports = router;
