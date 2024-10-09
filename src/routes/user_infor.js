const express = require('express');
const router = express.Router();
const auth = require('../app/controllers/UserInforController');
const middlewareAuth = require('../app/middleware/AuthMiddleware');

// router.get('/get', auth.getUser);
router.get('/user-info', middlewareAuth.authenticateToken, auth.getUserInfo);
router.get('/user-id', middlewareAuth.authenticateToken, auth.getIduser);


module.exports = router;
