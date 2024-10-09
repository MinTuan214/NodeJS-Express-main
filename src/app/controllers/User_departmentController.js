const User_department = require('../services/User_departmentService');
const jwt = require('jsonwebtoken');

async function getUserDepartment(req, res) {
    try {
        const userId = req.cookies.token;
        const token = jwt.verify(userId, process.env.JWT_SECRET)
        
        const UserDepartment = await User_department.getUserDepartment(token._id);
        if (!UserDepartment) {
            return res.status(404).json({ message: "User department not found" });
        }
        return res.json(UserDepartment);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error"})
    }
}

module.exports = { getUserDepartment }