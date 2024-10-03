const { json } = require('express');
const userService = require('../services/AuthService');

function index(req, res) {
    return res.render('auth/index');
}

async function getUser(req, res) {
    try {
        const user = await userService.getUser()
        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function register(req, res) {
    return res.render('auth/register');
}

async function store(req, res) {
    try {
        const user = await userService.registerUser(req.body);
        return res.json(user);
    } catch (error) {
        console.log(error);
    }
}

async function login(req, res) {
    try {
        const user = await userService.login(req.body.name, req.body.password);
        if(user){
            res.cookie('token', user.token, {
                httpOnly: true, 
                secure: false,
            });
            return res.json({
                message: "Successfully!",
                token: user.token,
                name: req.body.name,
            });
        }else{
            return json("Fail");
        }
    } catch (error) {
        if (error.message === "Wrong username!") {
            return res.status(404).json(error.message);
        } else if (error.message === "Wrong password!") {
            return res.status(404).json(error.message);
        } else {
            return res.status(500).json(error);
        }
    }
}

async function logout(req, res) {
    res.clearCookie('token');
    return res.json({ message: 'Logged out successfully' });
}

module.exports = { index, register, store, login, getUser, logout};