const chatRoute = require('./chatbox');
const userRoute = require('./user');
const accountRoute = require('./account');
const userInforRoute = require('./user_infor');
const departmentRoute = require('./department');
const UserDepartmentRoute = require('./user_department');
const middlewareAuth = require('../app/middleware/AuthMiddleware');


function route(app){
    app.use('/user',middlewareAuth.authenticateToken, userRoute);
    app.use('/account', accountRoute);
    app.use('/chatbox', chatRoute);
    app.use('/user-infor', userInforRoute);
    app.use('/department', departmentRoute);
    app.use('/userdepartment', UserDepartmentRoute);
    app.use('/', accountRoute);
}

module.exports = route;