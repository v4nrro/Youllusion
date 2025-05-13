const express = require('express');

const { deleteComment, postComment, getComments } = require("../controllers/commentsController.js");
const { authenticate } = require('../middleware/auth.js');

const router = express.Router();

router.get('/:id', getComments);
router.post('/:id', authenticate, postComment);
router.delete('/:id', authenticate, deleteComment);

module.exports = router;