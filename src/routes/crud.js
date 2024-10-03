const express = require('express');
const router = express.Router();
const crudController = require('../app/controllers/CrudController');
const middlewareAuth = require('../app/middleware/AuthMiddleware');


router.get('/get-users', crudController.getUser);
router.post('/store', crudController.createUser);
router.get('/auth/user-info', middlewareAuth.getUserInfo);
router.get('/', middlewareAuth.authenticateToken , crudController.index);

module.exports = router;
