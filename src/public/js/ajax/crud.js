import { ajaxRequest } from './apiHelper.js';

async function getUsers() {
    try {
        const users = await ajaxRequest('/crud/get-users', 'GET');
        const userList = document.getElementById('listCrud');
        userList.innerHTML = '';
        users.forEach(user => {
            userList.innerHTML += `
                    <tr>
                                <td>3</td>
                                <td class="th-user">
                                    <img src="image/219986.png" alt="">
                                    <span class="th-name">${user.name}</span>
                                </td>
                                <td>Viewer</td>
                                <td>Viewer@gmail.com</td>
                                <td>${user.address}</td>
                                <td>${user.city}</td>
                                <td>${user.contries}</td>
                                <td class="action">
                                    <a href="#"><i class="fa-solid fa-eye"></i></a> |
                                    <a href="#"><i class="fa-solid fa-pen-to-square"></i></a> |
                                    <a class="btn-delete"><i class="fa-solid fa-trash-can"></i></a> 
                                </td>
                            </tr>
                `
        });
        const btnDelete = document.querySelectorAll('.btn-delete');
        btnDelete.forEach(element => {
            element.addEventListener('click', () => {
                const modalDelete = document.querySelector('.modal-delete');
                modalDelete.classList.add('show-confirm');
            });
        });
    } catch (error) {
        alert('Error: khong render ra duoc');
    }
}

async function createUser() {
    const saveUser = document.querySelector('.btn-submit');
    saveUser.addEventListener('click', async () => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('name').value;
        const password = document.getElementById('name').value;

        try {
            const user = await ajaxRequest('/crud/store', 'POST', { name, email, password });
            getUsers()
            resetForm()
        } catch (error) {
            console.log('Error: ' + error.message);
        }
    })
}

async function resetForm() {
    document.getElementById('name').value = "";
    document.getElementById('name').value = "";
    document.getElementById('name').value = "";
}

window.onload = function () {
    getUsers();
    createUser();
}
