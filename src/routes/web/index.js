const express = require('express');
const router = express.Router();
const messageRouteWeb = require('./message');
const departmentRouteWeb = require('./department');
const authRouteWeb = require('./auth')

const middlewareAuth = require('../../app/middleware/AuthMiddleware');

    router.use('/messages', middlewareAuth.authenticateToken, messageRouteWeb);
    router.use('/departments', middlewareAuth.authenticateToken, departmentRouteWeb);
    router.use('/', authRouteWeb);

module.exports = router;