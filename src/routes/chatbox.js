const express = require('express');
const router = express.Router();
const chatbox = require('../app/controllers/ChatController');
const user = require('../app/controllers/AccountController');
const userInfor = require('../app/controllers/UserInforController');
const middlewareAuth = require('../app/middleware/AuthMiddleware');

router.get('/list-user', userInfor.getUser);

router.get('/message', chatbox.getMessage);
router.post('/send-message', chatbox.sendMessage);

router.get('/', middlewareAuth.authenticateToken, chatbox.index);

module.exports = router;
