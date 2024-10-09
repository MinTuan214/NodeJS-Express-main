const express = require('express');
const router = express.Router();
const chatbox = require('../app/controllers/ChatController');
const userInfor = require('../app/controllers/UserInforController');

router.get('/list-user', userInfor.getUser);
router.get('/:department', chatbox.getMessage);
router.post('/send-message', chatbox.sendMessage);
router.get('/', chatbox.index);

module.exports = router;
