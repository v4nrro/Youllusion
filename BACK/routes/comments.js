const express = require('express');

const { deleteComment, postComment, getComments, addOrRemoveLike, addOrRemoveDislike } = require("../controllers/commentsController.js");
const { authenticate } = require('../middleware/auth.js');

const router = express.Router();

router.get('/:id', getComments);

router.post("/like/:id", authenticate, addOrRemoveLike);
router.post("/dislike/:id", authenticate, addOrRemoveDislike);
router.post('/:id', authenticate, postComment);

router.delete('/:id', authenticate, deleteComment);

module.exports = router;