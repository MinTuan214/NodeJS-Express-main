const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Chat_Crud');
        console.log('Connect successfully');
    } catch (error) {   
        console.log('Fail');
    }
}

module.exports = { connect }