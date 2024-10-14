const express = require('express');
const router = express.Router();
const message = require('../../app/controllers/MessageController');

router.get('/', message.index);

module.exports = router;
