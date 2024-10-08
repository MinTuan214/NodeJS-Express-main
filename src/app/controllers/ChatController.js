const message = require('../services/ChatService');
const jwt = require('jsonwebtoken');

function index(req, res){
    return res.render('chatbox/index')
}

async function getMessage(req, res) {
    try {
        const departmentId = req.params.department;
        const userId = req.cookies.token; 
        
        const token = jwt.verify(userId, process.env.JWT_SECRET);
        const userMessages = await message.getMessage(departmentId, token._id);
        
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
        console.log(error);
    }
}

module.exports = { index, getMessage, sendMessage }