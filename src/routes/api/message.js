const express = require('express');
const router = express.Router();
const message = require('../../app/controllers/MessageController');
const userInfor = require('../../app/controllers/AccountController');

router.post('/', message.sendMessage);
router.get('/:id', message.getMessage);
router.get('/', userInfor.getUser);

module.exports = router;
