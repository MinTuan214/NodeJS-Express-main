const express = require('express');
const router = express.Router();
const chatbox = require('../app/controllers/ChatController');
const user = require('../app/controllers/AuthController');
const middlewareAuth = require('../app/middleware/AuthMiddleware');

router.get('/list-user', user.getUser)
router.get('/message', chatbox.getMessage);
router.post('/send-message', chatbox.sendMessage);
router.get('/', middlewareAuth.authenticateToken, chatbox.index);

module.exports = router;
