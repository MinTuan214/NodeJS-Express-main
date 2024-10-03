const User = require('../models/User');

async function getUser(){
    return await User.find({});
}

async function createUser(data) {
    const newUser = new User(data)
    return await newUser.save();
}

async function updateUser(id, data) {
    return await User.findByIdAndUpdate(id, data, {new: true});
}

async function deleteUser(id) {
    await User.findByIdAndDelete(id);
}

module.exports = { getUser, createUser, updateUser, deleteUser }