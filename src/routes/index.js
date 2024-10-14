const messageRouteWeb = require('./web/chatbox');
const accountRouteWeb = require('./web/account');
const departmentRouteWeb = require('./web/department');

const messageRouteApi = require('./api/chatbox');
const departmentRouteApi = require('./api/department');
const userDepartmentRouteApi = require('./api/userDepartment');
const authRouteApi = require('./api/auth');
const accountRouteApi = require('./api/account');

const middlewareAuth = require('../app/middleware/AuthMiddleware');



function route(app){
    app.use('/api/messages', middlewareAuth.authenticateToken, messageRouteApi);
    app.use('/api/departments', middlewareAuth.authenticateToken, departmentRouteApi);
    app.use('/api/userdepartments', middlewareAuth.authenticateToken, userDepartmentRouteApi);
    app.use('/api/auth', middlewareAuth.authenticateToken, authRouteApi)
    app.use('/api/', accountRouteApi)

    app.use('/messages', middlewareAuth.authenticateToken, messageRouteWeb);
    app.use('/departments', middlewareAuth.authenticateToken, departmentRouteWeb);
    app.use('/', accountRouteWeb);
}

module.exports = route;