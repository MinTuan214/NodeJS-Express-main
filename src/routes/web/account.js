const express = require('express');
const router = express.Router();
const auth = require('../../app/controllers/AccountController');

router.get('/register', auth.register);
router.get('/', auth.index);

module.exports = router;
