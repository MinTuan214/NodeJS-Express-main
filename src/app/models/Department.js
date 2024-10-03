const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Department = new Schema({
    department_name: { type:String },
    user_id: {
        type: String,
        ref: 'Account'
    }
},{
    timestamps: true,
    collection: 'departments'
})

module.exports = mongoose.model('departments', Department);