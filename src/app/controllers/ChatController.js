const message = require('../services/ChatService');

function index(req, res){
    return res.render('chatbox/index')
}

async function getMessage(req, res) {
    try {
        const mess = await message.getMessage()
        return res.json(mess);
    } catch (error) {   
        console.log(error);
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