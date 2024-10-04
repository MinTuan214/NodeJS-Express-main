const DepartmentService = require('../services/DepartmentService');

async function getDepartment(req, res) {
    const departments = await DepartmentService.getDepartment()
    return res.json(departments);
}

async function createDepartment(req, res) {
    const department = await DepartmentService.createDepartment(req.body);
    return res.json(department);
}

module.exports = { getDepartment, createDepartment }