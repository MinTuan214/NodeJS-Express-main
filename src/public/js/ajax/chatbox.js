import { ajaxRequest, setCookie, getCookie } from './apiHelper.js';
import { chooseUser } from '../script.js';

var currentUserId = null;

async function displayUserName() {
    try {
        const response = await ajaxRequest('user-infor/user-info', 'GET');
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
        const response = await ajaxRequest('/account/logout', 'POST');
        if (response.message === 'Logged out successfully') {
            window.location.href = '/';
        }
    } catch (error) {
        console.error('Error logging out:', error);
    }
}

async function getUserChat() {
    try {
        const userDepartments = await ajaxRequest('/userdepartment', 'GET');
        const listUser = document.querySelector('.box-list-user');
        listUser.innerHTML = '';

        userDepartments.joinedDepartments.forEach(department => {
            listUser.innerHTML += `
                <div class="content-message">
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
                </div>
            `;
        });

        userDepartments.createdDepartments.forEach(department => {
            listUser.innerHTML += `
                <div class="content-message">
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
                </div>
            `;
        });

        chooseUser();
    } catch (error) {
        console.log(error);
    }
}


async function getID() {
    try {
        const response = await ajaxRequest('user-infor/user-id', 'GET');
        currentUserId = response.id;
    } catch (error) {
        console.log('Error fetching user ID:', error);
    }
} 


async function getMessage() {
    try {
        const message = await ajaxRequest('/chatbox/message', 'GET');
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
            try {
                await ajaxRequest('/chatbox/send-message', 'POST', { content: contentMess, user_id: currentUserId  });
                getMessage();
                document.getElementById('send-message').value = '';
            } catch (error) {
                console.log('Error: ' + error.message);
            }
        })


}

window.onload = function () {
    document.querySelector(".fa-power-off").addEventListener('click', logout);
    getID();
    displayUserName();
    getUserChat();
    sendMessage();
    getMessage();
}

setInterval(() =>{
    getMessage()
},2000)