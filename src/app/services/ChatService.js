const Chat = require('../models/Message');

async function getMessage() {
    try {
        const message = await Chat.find({})
        .populate('user_id', 'name avatar');
        return message;
    } catch (error) {   
        console.log(error);
    }
}
async function sendMessage(data) {
    try {
        const newMessage = new Chat(data);
        return newMessage.save(); 
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getMessage, sendMessage }