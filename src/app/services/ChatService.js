const Chat = require('../models/Message');
const Department = require('../models/Department');
const User_department = require('../models/User_department');

async function getMessage(departmentId) {
    try {
        const message = await Chat.find({ department_id: departmentId })
            .populate('user_id', 'name avatar');
        return message;
    } catch (error) {   
        console.log('Error fetching messages:', error);
    }
}

async function sendMessage(data) {
    try {
        let departmentId;
        const isLeader = await Department.findOne({ _id: data.department_id, user_id: data.user_id });

        if (isLeader) {
            departmentId = isLeader._id;
        } else {
            const userDepartment = await User_department.findOne({ user_id: data.user_id })
            .populate('department_id');

            if (userDepartment && userDepartment.department_id) {
                departmentId = userDepartment.department_id._id;
            } else {
                throw new Error('User does not belong to any department');
            }
        }

        const newMessage = new Chat({
            content: data.content,
            user_id: data.user_id,
            department_id: departmentId
        });
        
        console.log(departmentId);
        
        const savedMessage = await newMessage.save();

        return savedMessage; 
    } catch (error) {
        console.log('Error sending message:', error);
        throw new Error('Failed to send message');
    }
}

module.exports = { getMessage, sendMessage }
