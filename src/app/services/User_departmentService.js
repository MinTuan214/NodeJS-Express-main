const User_department = require('../models/User_department');

async function getUserDepartment() {
    try {
        const UserDepartment = await User_department.find({})
        .populate('department_id', 'department_name');
        return UserDepartment;
    } catch (error) {
        
    }
}

module.exports = { getUserDepartment }