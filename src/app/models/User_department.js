const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User_department = new Schema({
    user_id: { 
        type: String,
        ref: 'Account'
    },
    department_id: { 
        type: String,
        ref: 'departments'
    }
},{
    timestamps: true,
    collection: 'user_departments'
}) 

module.exports = mongoose.model('user_departments', User_department);