const UserInforService = require('../services/UserInforService');
const jwt = require('jsonwebtoken');

async function getUser(req, res) {
    try {
        const user = await UserInforService.getUser();
        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getUserInfo(req, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Token not found" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        return res.json({ name: user.name });
    });
}

function getIduser(req, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Token not found" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        return res.json({ id: user._id });
    });
}

module.exports = { getUser, getUserInfo, getIduser }