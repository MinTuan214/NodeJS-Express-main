const DepartmentService = require('../services/DepartmentService');


async function index(req, res){
    return res.render('department/index')
}

async function getDepartment(req, res) {
    try {
        const departments = await DepartmentService.getDepartment()
        return res.json(departments);
    } catch (error) {   
        if(res.statusCode === 401){
            return render('auth/index')
        }
        console.log(error);
    }
}

async function createDepartment(req, res) {
    try {
        const department = await DepartmentService.createDepartment(req.body);
        return res.json(department);
    } catch (error) {
        if(res.status === 401){
            return render('auth/index')
        }
        console.log(error);   
    }
}

module.exports = { getDepartment, createDepartment, index }