const Chat = require('../models/Message');
const Department = require('../models/Department');
const User_department = require('../models/User_department');

async function getMessage(departmentId) {
    try {
        // Lấy tất cả tin nhắn của phòng ban (bất kể người dùng có là trưởng nhóm hay không)
        const message = await Chat.find({ department_id: departmentId })
            .populate('user_id', 'name avatar'); // lấy thông tin người dùng (name, avatar)
        return message;
    } catch (error) {
        console.log('Error fetching messages:', error);
    }
}





async function sendMessage(data) {
    try {
        let departmentId;
        // Kiểm tra nếu là trưởng nhóm
        const isLeader = await Department.findOne({ _id: data.department_id, user_id: data.user_id });

        if (isLeader) {
            departmentId = isLeader._id;
        } else {
            // Nếu không là trưởng nhóm, kiểm tra xem người dùng có trong phòng ban không
            const userDepartment = await User_department.findOne({ user_id: data.user_id })
            .populate('department_id');

            if (userDepartment && userDepartment.department_id) {
                departmentId = userDepartment.department_id._id;
            } else {
                throw new Error('User does not belong to any department');
            }
        }

        // Tạo tin nhắn mới
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
