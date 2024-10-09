import { ajaxRequest, setCookie, getCookie } from './apiHelper.js';
import { chooseUser } from '../script.js';

var currentUserId = null;
var currentDepartmentId = null;

async function displayUserName() {
    try {
        const response = await ajaxRequest('auth/user-info', 'GET');
        const userNameElement = document.getElementById('user-name');
        if (userNameElement && response.name) {
            userNameElement.textContent = response.name;
        }
    } catch (error) {
        console.log('Error fetching user info:', error);
    }
}

function formatTimestampToVNTime(timestamp) {
    const date = new Date(timestamp);

    const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Ho_Chi_Minh'
    };
    const formattedTime = date.toLocaleTimeString('vi-VN', options);
    
    return formattedTime;
}

async function logout() {
    try {
        const response = await ajaxRequest('/logout', 'POST');
        if (response.message === 'Logged out successfully') {
            window.location.href = '/';
        }
    } catch (error) {
        console.error('Error logging out:', error);
    }
}

async function chooseDepartment(department) {
    if (department._id) {
        currentDepartmentId = department._id;  
    } else if (department.department_id && department.department_id._id) {
        currentDepartmentId = department.department_id._id; 
    }

    getMessage();  

    const departmentNameElement = document.querySelector('.name-status .name');
    
    if (departmentNameElement) {
        const departmentName = department.department_name || department.department_id.department_name;
        departmentNameElement.textContent = departmentName;
    }
}

async function getUserChat() {
    try {
        const userDepartments = await ajaxRequest('/userdepartments', 'GET');
        const listUser = document.querySelector('.box-list-user');
        listUser.innerHTML = '';

        userDepartments.joinedDepartments.forEach(department => {
            const departmentDiv = document.createElement('div');
            departmentDiv.classList.add('content-message');
            departmentDiv.innerHTML = `
                <div class="left">
                    <div class="avatar">
                        <img src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png" alt="">
                    </div>
                    <div class="name-message">
                        <span class="name">${department.department_id.department_name}</span>
                        <p class="status">Online
                            <span class="dot"></span>
                        </p>
                    </div>
                </div>
                <div class="right">
                    <div class="time">
                        <p>12:35</p>
                    </div>
                </div>
            `;
            departmentDiv.addEventListener('click', () => {            
                chooseDepartment(department); 
            });

            listUser.appendChild(departmentDiv);
        });

        userDepartments.createdDepartments.forEach(department => {
            const departmentDiv = document.createElement('div');
            departmentDiv.classList.add('content-message');
            departmentDiv.innerHTML = `
                <div class="left">
                    <div class="avatar">
                        <img src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png" alt="">
                    </div>
                    <div class="name-message">
                        <span class="name">${department.department_name}</span>
                        <p class="status">Online
                            <span class="dot"></span>
                        </p>
                    </div>
                </div>
                <div class="right">
                    <div class="time">
                        <p>12:35</p>
                    </div>
                </div>
            `;
            departmentDiv.addEventListener('click', () => {
                chooseDepartment(department); 
            });

            listUser.appendChild(departmentDiv);
        });

        chooseUser();
    } catch (error) {
        console.log(error);
    }
}

async function getID() {
    try {
        const response = await ajaxRequest('auth/user-id', 'GET');
        currentUserId = response.id;
    } catch (error) {
        console.log('Error fetching user ID:', error);
    }
} 

async function getMessage() {
    try {
        if (!currentDepartmentId) return;

        const message = await ajaxRequest(`/messages/${currentDepartmentId}`, 'GET');
        console.log("Fetched messages:", message);
        
        const chatMessage = document.querySelector('.chat-messages');
        chatMessage.innerHTML = '';
        message.reverse().forEach(mess => {
            const timestamp = mess.createdAt;
            const formattedTime = formatTimestampToVNTime(timestamp);
            if(mess.user_id._id === currentUserId){                
                chatMessage.innerHTML += `
                    <div class="message sent">
                        <div class="message-content">
                            <span class="time">${formattedTime}</span>
                            <p>${mess.content}</p>
                        </div>
                        <img src="${mess.user_id.avatar}" alt="MinhTuan">
                    </div>
                `;
            }else{
                chatMessage.innerHTML += `
                    <div class="message received">
                        <img src="${mess.user_id.avatar}" alt="MinhTuan">
                        <div class="message-content">
                                <p>${mess.content}</p>
                                <span class="time">${formattedTime}</span>
                            </div>
                    </div>                
                `;
            }
            
            chatMessage.scrollTop = chatMessage.scrollHeight; 
        });
    } catch (error) {
        console.log(error); 
    }
}

async function sendMessage() {
        const btnSend = document.querySelector('.btn-send');
        btnSend?.addEventListener('click', async () => {
            const contentMess = document.getElementById('send-message').value;
            if (!contentMess) return;
            try {
                await ajaxRequest('/messages/send-message', 'POST', 
                    {   
                        content: contentMess, 
                        user_id: currentUserId, 
                        department_id: currentDepartmentId  
                    });
                getMessage();
                document.getElementById('send-message').value = '';
            } catch (error) {
                console.log('Error: ' + error.message);
            }
        })
}

function main(){
    document.querySelector(".fa-power-off").addEventListener('click', logout);
    getID();
    displayUserName();
    getUserChat();
    sendMessage();
    getMessage();
}
main()

setInterval(() =>{
    getMessage()
},2000)