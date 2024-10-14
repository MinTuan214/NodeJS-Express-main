const express = require('express');
const router = express.Router();
const auth = require('../../app/controllers/AuthController');

router.get('/register', auth.register);
router.get('/', auth.index);

module.exports = router;
