const User = require('../models/Account');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');


async function getUser() {
    try {
        const users = await User.find({});
        return users;
    } catch (error) {
        console.log(error);
    }
}

async function registerUser(userData) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(userData.password, salt);

        const createUser = await new User({
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            password: hashed
        })

        return await createUser.save();
    } catch (error) {
        console.log(error);
    }
}

async function login(name, password) {
    try {
        const user = await User.findOne({ name });
        if (!user) {
            return { success: false, message: "Wrong username!" };
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return { success: false, message: "Wrong password!" };;
        }
        if (user) {
            const token = jwt.sign(
                {
                    _id: user._id,
                    name: user.name
                },
                process.env.JWT_SECRET,
                { expiresIn: "5m" }
            )
            return { token }
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = { registerUser, login, getUser }