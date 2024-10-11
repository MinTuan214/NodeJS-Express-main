const Department = require('../models/Department');
const User_department = require('../models/User_department');

async function getDepartment() {
    try {
        const departments = await Department.find({})
        .populate('user_id', 'name phone');
        return departments;
    } catch (error) {
        console.log(error);
    }
}

async function getOneDepartment(id) {
    try {
        const department = await Department.findById(id)
        .populate('user_id', 'name phone');
        return department;
    } catch (error) {
        console.log(error);
    }
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
        console.log(error);
    }
}

async function updateDepartment(id, data) {
    try {
        const department = await Department.findByIdAndUpdate(id, data, {new: true});
        return department;
    } catch (error) {
        console.log(error);
    }
}

async function deleteDepartment(id) {
    try {
        const department = await Department.findByIdAndDelete(id);
        if (!department) {
            throw new Error("Department not found");
        }
        return department;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


module.exports = { 
        getDepartment, 
        getOneDepartment, 
        createDepartment, 
        updateDepartment, 
        deleteDepartment
    }