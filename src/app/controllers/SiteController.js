const User = require('../models/User');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController{
    index(req, res, next){
        User.find({})
        .then(users => {
            res.render('home', {
                users: mutipleMongooseToObject(users)
            })    
        })
        .catch(next)
    }k
}

module.exports = new SiteController;