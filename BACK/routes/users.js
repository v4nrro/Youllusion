const express = require('express');

const { getLoggedUser } = require("../controllers/usersController.js");
const { authenticate } = require("../middleware/auth.js");

const router = express.Router();

router.get('/me', authenticate, getLoggedUser);

module.exports = router;