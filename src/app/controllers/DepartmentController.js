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

async function getOneDepartment(req, res) {
    try {
        const department = await DepartmentService.getOneDepartment(req.params.id);
        return res.json(department);
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Department not found"})
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

async function updateDepartment(req, res) {
    try {
        const departmentId = req.params.id;
        const department = await DepartmentService.updateDepartment(departmentId, req.body);
        return res.json(department);
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Department not found"})
    }
}

async function deleteDepartment(req, res) {
    try {
        const deletedDepartment = await DepartmentService.deleteDepartment(req.params.id);
        if (!deletedDepartment) {
            return res.status(404).json({ message: "Department not found" });
        }
        return res.status(200).json({ message: "Department deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error deleting department" });
    }
}

module.exports = { 
    index, 
    getDepartment,
    getOneDepartment, 
    createDepartment, 
    updateDepartment, 
    deleteDepartment 
}