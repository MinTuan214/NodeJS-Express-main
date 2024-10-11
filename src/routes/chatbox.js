const express = require('express');
const router = express.Router();
const chatbox = require('../app/controllers/ChatController');
const userInfor = require('../app/controllers/UserInforController');

router.post('/messages', chatbox.sendMessage);
router.get('/messages', userInfor.getUser);
router.get('/messages/:id', chatbox.getMessage);

router.get('/', chatbox.index);

module.exports = router;
