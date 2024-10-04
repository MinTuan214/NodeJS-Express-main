const express = require('express');
const router = express.Router();
const auth = require('../app/controllers/AccountController');


router.get('/register', auth.register);
router.post('/store', auth.store);

router.post('/login', auth.login);
router.post('/logout', auth.logout);

router.get('/', auth.index);

module.exports = router;
