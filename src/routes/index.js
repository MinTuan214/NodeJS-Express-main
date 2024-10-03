const loginRoute = require('./auth');
const chatRoute = require('./chatbox');
const crudRoute = require('./crud');
const authRoute = require('./auth');

function route(app){
    app.use('/crud', crudRoute);
    app.use('/auth', authRoute);
    app.use('/chatbox', chatRoute);
    app.use('/', loginRoute);
}

module.exports = route;