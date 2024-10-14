const express = require('express');
const router = express.Router();
const messageRouteApi = require('./message');
const departmentRouteApi = require('./department');
const userDepartmentRouteApi = require('./userDepartment');
const authRouteApi = require('./auth');
const accountRouteApi = require('./account');

const middlewareAuth = require('../../app/middleware/AuthMiddleware');

    router.use('/messages', middlewareAuth.authenticateToken, messageRouteApi);
    router.use('/departments', middlewareAuth.authenticateToken, departmentRouteApi);
    router.use('/user_departments', middlewareAuth.authenticateToken, userDepartmentRouteApi);
    router.use('/account', middlewareAuth.authenticateToken, accountRouteApi);
    router.use('/auth', authRouteApi);

module.exports = router;