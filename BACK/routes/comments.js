const express = require('express');

const { deleteComment, postComment } = require("../controllers/commentsController.js");
const { authenticate } = require('../middleware/auth.js');

const router = express.Router();

router.delete('/:id', authenticate, deleteComment);
router.post('/', postComment);

module.exports = router;