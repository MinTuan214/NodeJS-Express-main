const message = require('../services/ChatService');
const jwt = require('jsonwebtoken');

function index(req, res){
    return res.render('chatbox/index')
}

async function getMessage(req, res) {
    try {
        const departmentId = req.params.department;
        const userId = req.cookies.token; 
        
        jwt.verify(userId, process.env.JWT_SECRET);

        const userMessages = await message.getMessage(departmentId);
        
        return res.json(userMessages);
    } catch (error) {
        console.log('Error in controller:', error);
    }
}

async function sendMessage(req, res) {
    try {
        const sendMessage = await message.sendMessage(req.body);
        return res.json(sendMessage);
    } catch (error) {
        console.log('Error sending message:', error);
        return res.status(500).json({ message: "Failed to send message" });
    }
}

module.exports = { index, getMessage, sendMessage }