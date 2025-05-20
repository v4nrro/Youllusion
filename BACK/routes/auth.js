const express = require('express');
const passport = require('passport');

const { register, login, validate, googleCallback } = require("../controllers/authController.js");
const { imageUpload } = require('../utils/multer.js');

const router = express.Router();

router.get("/google/login", passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: "/" }), googleCallback);
router.get("/validate", validate);
router.post("/register", imageUpload.single('avatar'), register);
router.post("/login", login);

module.exports = router;