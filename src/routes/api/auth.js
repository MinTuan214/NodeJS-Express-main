const express = require('express');
const router = express.Router();
const auth = require('../../app/controllers/AuthController');

const middlewareAuth = require('../../app/middleware/AuthMiddleware');

router.post('/login', auth.login);
router.post('/register', auth.register_);

router.post('/logout', middlewareAuth.authenticateToken, auth.logout);


module.exports = router;
