const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const User = new Schema({
    name: { type: String },
    email: { type: String },
    password: {type: String},
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    contries: { type: String },
}, {
    timestamps: true
});

User.plugin(mongooseDelete, { deletedAt : true , overrideMethods: 'all' })

module.exports = mongoose.model('User', User);