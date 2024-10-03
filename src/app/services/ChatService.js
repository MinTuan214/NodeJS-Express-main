const Chat = require('../models/Message');

async function getMessage() {
    const message = await Chat.find({})
    .populate('user_id', 'name avatar');
    return message;
}
async function sendMessage(data) {
    const newMessage = new Chat(data);
    return newMessage.save(); 
}

module.exports = { getMessage, sendMessage }