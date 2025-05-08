const express = require('express');

const { register, login, validate } = require("../controllers/authController.js");
const { imageUpload } = require('../utils/multer.js');

const router = express.Router();

router.post("/register", imageUpload.single('avatar'), register);
router.post("/login", login);
router.get("/validate", validate);

module.exports = router;