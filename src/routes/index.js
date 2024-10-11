const messageRoute = require('./chatbox');
const accountRoute = require('./account');
const authRoute = require('./user_infor');
const departmentRoute = require('./department');
const userDepartmentRoute = require('./user_department');
const middlewareAuth = require('../app/middleware/AuthMiddleware');


function route(app){
    app.use('/message', middlewareAuth.authenticateToken, messageRoute);
    app.use('/auth', middlewareAuth.authenticateToken, authRoute);
    app.use('/userdepartments', middlewareAuth.authenticateToken, userDepartmentRoute);
    app.use('/department', middlewareAuth.authenticateToken, departmentRoute);
    app.use('/', accountRoute);
}

module.exports = route;