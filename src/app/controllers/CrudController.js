const User = require('../services/CrudService');

class CrudController{
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

module.exports = new CrudController;