const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User_department = new Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth'
    },
    department_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    }
},{
    timestamps: true,
    collection: 'User_department'
}) 

module.exports = mongoose.model('User_department', User_department);