const express = require('express');
const router = express.Router();
const chatbox = require('../../app/controllers/ChatController');

router.get('/', chatbox.index);

module.exports = router;
