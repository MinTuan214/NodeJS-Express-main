const User = require('../models/Auth');
require('dotenv').config();

async function getUser() {
    try {
        const users = await User.find({});
        return users;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getUser }