const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/users', postController.createUser);
router.post('/login', postController.loginUser);

// Existing routes...

module.exports = router;
