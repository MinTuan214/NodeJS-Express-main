const express = require('express');
const router = express.Router();
const auth = require('../../app/controllers/AccountController');

router.post('/store', auth.store);
router.post('/login', auth.login);
router.post('/logout', auth.logout);


module.exports = router;
