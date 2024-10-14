const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Department = new Schema({
    department_name: { type:String },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth'
    }
},{
    timestamps: true,
    collection: 'Department'
})

module.exports = mongoose.model('Department', Department);