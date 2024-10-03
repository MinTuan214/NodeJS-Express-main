const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CrudUser = new Schema({
    name: { 
        type: String,  
        required: true,
        minlenght: 6,
        maxlenght: 20,
    },
    email: { 
        type: String,  
        required: true,
        minlenght: 6,
        maxlenght: 20,
    },
    phone: { 
        type: String,  
        required: true,
        lenght: 10,
    },
    password: { 
        type: String,  
        required: true,
        minlenght: 6,
    },
    admin: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true }
);

module.exports = mongoose.model('CrudUser', CrudUser);
