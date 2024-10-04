const User = require('../models/Account');
require('dotenv').config();

async function getUser() {
    const users = await User.find({});
    return users;
}

module.exports = { getUser }