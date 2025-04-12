const express = require('express');

const { getLoggedUser, getAllUsers, getUserById, deleteByAdmin, deleteByMe, putByMe } = require("../controllers/usersController.js");
const { authenticate, role } = require("../middleware/auth.js");

const router = express.Router();

router.get('', authenticate, role(['admin']), getAllUsers);
router.get('/me', authenticate, getLoggedUser);
router.get('/:id', getUserById);

router.put('/me/:id', authenticate, putByMe);
router.delete('/me/:id', authenticate, deleteByMe);
router.delete('/:id', authenticate, role(['admin']), deleteByAdmin)
module.exports = router;