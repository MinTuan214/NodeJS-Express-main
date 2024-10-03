import { ajaxRequest, setCookie, getCookie } from './apiHelper.js';

async function register() {
    const btnRegister = document.querySelector('.btn-register');

    btnRegister?.addEventListener('click', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;

        try {
            await ajaxRequest('/auth/store', 'POST', { name, email, phone, password });
            resetform();
            alert("Register successfully!")
        } catch (error) {
            console.log('Error: ' + error.message);
        }
    })
}

async function login() {
    const btnLogin = document.querySelector('.login');
    btnLogin?.addEventListener('click', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const password = document.getElementById('password').value;
        try {
            const response = await ajaxRequest('/auth/login', 'POST', { name, password });
            if (response) {
                setCookie('token', response.token, 1);
                window.location.href = '/crud'
            }
        } catch (error) {
            alert("Login error");
        }
    });
}

function resetform() {
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('phone').value = "";
    document.getElementById('password').value = "";
}

window.onload = function () {
    login();
    register();
}
