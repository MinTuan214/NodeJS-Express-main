const User_department = require('../services/User_departmentService');
const jwt = require('jsonwebtoken');

async function getUserDepartment(req, res) {
    try {
        const userId = req.cookies.token;
        const token = jwt.verify(userId, process.env.JWT_SECRET)
        
        const UserDepartment = await User_department.getUserDepartment(token._id);
        return res.json(UserDepartment);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getUserDepartment }