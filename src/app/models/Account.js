const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        length: 10
    },
    avatar: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Account', Account);
