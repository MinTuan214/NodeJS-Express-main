const Department = require('../models/Department');
const User_department = require('../models/User_department');

async function getDepartment() {
    const departments = await Department.find({})
    .populate('user_id', 'name phone');
    return departments;
}

async function createDepartment(data) {
    try {
        const department = new Department({
            department_name: data.department_name,
            user_id: data.user_id
        });
        const saveDepartment = await department.save();
        
        if (data.selected_user_id) {
            const userDepartment = new User_department({
                user_id: data.selected_user_id, 
                department_id: saveDepartment._id 
            });
            await userDepartment.save();
        }
        return saveDepartment;

    } catch (error) {
        
    }
}

module.exports = { getDepartment, createDepartment }