import { ajaxRequest } from './apiHelper.js';

var currentUserId = null;
var selectedId = null;

async function displayUserName() {
    try {
        const response = await ajaxRequest('auth/user-info', 'GET');
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

async function renderDepartment(departments) {
    try {
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
                            <a class="btn-edit" data-id="${department._id}" data-name="${department.department_name}" data-user="${department.user_id._id}"><i class="fa-solid fa-pen-to-square"></i></a> |                            
                            <a class="btn-delete" data-id="${department._id}"><i class="fa-solid fa-trash-can"></i></a> 
                        </td>
                    </tr>
                `;
        });
        addEditEvent();

        const btnDelete = document.querySelectorAll('.btn-delete');
        btnDelete.forEach(element => {
            element.addEventListener('click', function() {
                const modalDelete = document.querySelector('.modal-delete');
                modalDelete.classList.add('show-confirm');
                selectedId = this.getAttribute('data-id');
            });
        });
    } catch (error) {
        console.log(error);
    }
}
 
async function getDepartments() {
    try {
        const departments = await ajaxRequest('/departments/list', 'GET');
        renderDepartment(departments);
    } catch (error) {
        alert('Error: Cannot be displayed');
    }
}

async function updateDepartment() {
    const updateUser = document.querySelector('.btn-submit');
    updateUser.addEventListener('click', async () => {
        const { departmentName, selectUsers } = getFormValues();
        try {
            if (selectedId) {
                getDepartments();
                const modalUpdate = document.querySelector('.modal-add');
                modalUpdate.classList.remove('show-confirm');
                await ajaxRequest(`/departments/${selectedId}`, 'PUT', 
                    { 
                        department_name: departmentName, 
                        selected_user_id: selectUsers
                    });
                selectedId = null;
                }
        } catch (error) {
            console.log('Error: ' + error.message);
        }
    });
}

function addCreateEvent() {
    const createButton = document.querySelector('.filter-user .add');
    const title = document.querySelector('.modal-add .title h2');
    const titleBtn = document.querySelector('.btn.btn-submit');

    createButton.addEventListener('click', function() {
        title.textContent = "Create New Department";
        titleBtn.textContent = "Create Department";

        resetForm();

        selectedId = null;

        const modalCreate = document.querySelector('.modal-add');
        modalCreate.classList.add('show-confirm');
    });
}


function addEditEvent() {
    const btnEdit = document.querySelectorAll('.btn-edit');
    const title = document.querySelector('.modal-add .title h2');
    const titleBtn = document.querySelector('.btn.btn-submit');
    btnEdit.forEach(element => {
        element.addEventListener('click', function() {
            const departmentId = this.getAttribute('data-id');
            const departmentName = this.getAttribute('data-name');
            const userId = this.getAttribute('data-user');

            title.textContent = "Update Department";
            titleBtn.textContent = "Update Department";
            document.getElementById('department-name').value = departmentName;
            document.getElementById('select-users').value = userId;
            
            const modalUpdate = document.querySelector('.modal-add');
            modalUpdate.classList.add('show-confirm');
            selectedId = departmentId;
        });
    });
}

async function addDeleteEvent() {
    const confirmDelete = document.querySelector('.btn.yes');
    confirmDelete.addEventListener('click', async () => {
        try {
            if (selectedId) {
                document.querySelector('.modal-delete').classList.remove('show-confirm');
                getDepartments();
                await ajaxRequest(`departments/${selectedId}`, 'DELETE');
                selectedId = null;
            }
        } catch (error) {
            console.log(error);
        }
    });
}

async function selectUsers() {
    try {
        const users = await ajaxRequest('/messages/list', 'GET');
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
        const response = await ajaxRequest('auth/user-id', 'GET');
        currentUserId = response.id;
    } catch (error) {
        console.log('Error fetching user ID:', error);
    }
} 

function getFormValues() {
    const departmentName = document.getElementById('department-name').value;
    const selectUsers = document.getElementById('select-users').value;
    return { departmentName, selectUsers };
}

async function handleDepartment() {
    const saveUser = document.querySelector('.btn-submit');
    saveUser.addEventListener('click', async () => {
        const { departmentName, selectUsers } = getFormValues();
        try {
            if (!selectedId) { 
                await ajaxRequest('/departments', 'POST', { 
                    department_name: departmentName, 
                    user_id: currentUserId,
                    selected_user_id: selectUsers
                });
            } else {
                await ajaxRequest(`/departments/${selectedId}`, 'PUT', { 
                    department_name: departmentName, 
                    user_id: currentUserId,
                    selected_user_id: selectUsers
                });
            }
            getDepartments();
            resetForm();
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
    handleDepartment();
    addDeleteEvent();
    addCreateEvent();
    updateDepartment();
}

main();
