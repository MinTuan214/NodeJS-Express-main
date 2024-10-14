const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.PORT_CONNECT_DB);
        console.log('Connect successfully');
    } catch (error) {   
        console.log('Fail');
    }
}

module.exports = { connect }