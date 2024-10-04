const User_department = require('../services/User_departmentService');

async function getUserDepartment(req, res) {
    try {
        const userId = req.cookies.token;
        const UserDepartment = await User_department.getUserDepartment(userId);
        return res.json(UserDepartment);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getUserDepartment }