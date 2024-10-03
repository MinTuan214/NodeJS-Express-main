const express = require('express');
const router = express.Router();
const auth = require('../app/controllers/AuthController');
const middlewareAuth = require('../app/middleware/AuthMiddleware');

router.get('/register', auth.register);
router.post('/store', auth.store);
router.post('/login', auth.login);
router.post('/logout', auth.logout);
router.get('/get', auth.getUser);
router.get('/user-info', middlewareAuth.getUserInfo);
router.get('/user-id', middlewareAuth.getIduser);
router.get('/', auth.index);

module.exports = router;
