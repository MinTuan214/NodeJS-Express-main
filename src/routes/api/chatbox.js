const express = require('express');
const router = express.Router();
const chatbox = require('../../app/controllers/ChatController');
const userInfor = require('../../app/controllers/UserInforController');

router.post('/', chatbox.sendMessage);
router.get('/:id', chatbox.getMessage);
router.get('/', userInfor.getUser);

module.exports = router;
