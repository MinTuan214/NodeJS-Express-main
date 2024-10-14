const express = require('express');
const router = express.Router();
const account = require('../../app/controllers/AccountController');

router.get('/user-info', account.getUserInfo);
router.get('/user-id', account.getIduser);

module.exports = router;
