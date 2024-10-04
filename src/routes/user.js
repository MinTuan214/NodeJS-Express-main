const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');
const middlewareAuth = require('../app/middleware/AuthMiddleware');


router.get('/get-users', userController.getUser);
router.post('/store', userController.createUser);
router.get('/', userController.index);

module.exports = router;
