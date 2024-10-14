const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema({
    content: { type:String },
    user_id: {
        type: String,
        ref: 'Auth'
    },
    department_id: {
        type: String,
        ref: 'Department'
    }
},{
    timestamps: true,
    collection: 'Message'
})

module.exports = mongoose.model('Message', Message);
