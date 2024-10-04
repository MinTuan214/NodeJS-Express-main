const User = require('../services/UserService');

class UserController{
    async index(req, res){
        return res.render('crud/index')
    }

    async getUser(req, res) {
        try {
            const user = await User.getUser()        
            return res.json(user);
        } catch (error) {
            console.log(error);
        }
    }

    async createUser(req, res) {
        try {
            const user = await User.createUser(req.body);
            return res.json(user);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteUser(req, res){
        try {
            const user = await User.deleteUser(req.params.id)
            return res.json(user)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new UserController;