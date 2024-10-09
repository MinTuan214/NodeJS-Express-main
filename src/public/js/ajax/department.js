import { ajaxRequest } from './apiHelper.js';

var currentUserId = null;

async function displayUserName() {
    try {
        const response = await ajaxRequest('user-infor/user-info', 'GET');
        const userNameElement = document.getElementById('list-of');
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
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: 'Asia/Ho_Chi_Minh',
    };
    const formattedTime = date.toLocaleTimeString('vi-VN', options);
    
    return formattedTime;
}

async function getDepartments() {
    try {
        const departments = await ajaxRequest('/department/get-department', 'GET');
        const departmentList = document.getElementById('listDepartment');
        departmentList.innerHTML = '';
        if (departments.length == 0) {
            departmentList.innerHTML = `
                <tr>
                    <td class="not-user" colspan="5">Hiện tại chưa có phòng ban nào.</td>
                </tr>
            `;
        }
        departments.forEach(department => {
            const timestamp = department.createdAt;
            const formattedTime = formatTimestampToVNTime(timestamp);
            departmentList.innerHTML += `
                    <tr>
                        <td><input type="checkbox" /></td>
                        <td>${department.department_name}</td>
                        <td>${department.user_id.name}</td>
                        <td>${formattedTime}</td>
                        <td class="action">
                            <a href="#"><i class="fa-solid fa-eye"></i></a> |
                            <a href="#"><i class="fa-solid fa-pen-to-square"></i></a> |
                            <a class="btn-delete"><i class="fa-solid fa-trash-can"></i></a> 
                        </td>
                    </tr>
                `;
        });
        const btnDelete = document.querySelectorAll('.btn-delete');
        btnDelete.forEach(element => {
            element.addEventListener('click', () => {
                const modalDelete = document.querySelector('.modal-delete');
                modalDelete.classList.add('show-confirm');
            });
        });
    } catch (error) {
        alert('Error: Cannot be displayed');
    }
}

async function selectUsers() {
    try {
        const users = await ajaxRequest('/chatbox/list-user', 'GET');
        const select = document.getElementById("select-users");
        select.innerHTML = '';
        users.forEach(user => {
            select.innerHTML += `
                <option value="${user._id}">${user.name}</option>
            `;
        })
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

async function createDepartment() {
    const saveUser = document.querySelector('.btn-submit');
    saveUser.addEventListener('click', async () => {
        const departmentName = document.getElementById('department-name').value;
        const selectUsers = document.getElementById('select-users').value;

        try {
            await ajaxRequest('/department/store', 'POST', 
                { 
                    department_name: departmentName, 
                    user_id: currentUserId,
                    selected_user_id: selectUsers
                });
            getDepartments()
            resetForm()
        } catch (error) {
            console.log('Error: ' + error.message);
        }
    });
}

async function resetForm() {
    document.getElementById('department-name').value = "";
}

function main(){
    getID();
    displayUserName();
    getDepartments();
    selectUsers();
    createDepartment();
}

main();
