const User_department = require('../models/User_department');
const Department = require('../models/Department');

async function getUserDepartment(userID) {
    try {
        const userDepartments = await User_department.find({ user_id: userID })
        .populate('department_id');
        
        const createdDepartments = await Department.find({ user_id: userID });

        return {
            joinedDepartments: userDepartments,
            createdDepartments: createdDepartments
        };
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getUserDepartment }