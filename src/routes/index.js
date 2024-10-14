const routeApi = require('./api/index');
const routeWeb = require('./web/index');

function route(app){
    app.use('/api', routeApi);
    app.use('/', routeWeb);
}

module.exports = route;