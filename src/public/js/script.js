function modal() {
    const modalAdd = document.querySelector('.modal-add');
    const modalDelete = document.querySelector('.modal-delete');
    const formAdd = document.querySelector('.form-add');
    const btnAdd = document.querySelector('.add');
    const closeModal = document.querySelectorAll('.close-modal');
    const btnDelete = document.querySelectorAll('.btn-delete');
    const formConfirm = document.querySelector('.form-confirm');

    if (btnAdd) {
        btnAdd.addEventListener('click', () => {
            modalAdd?.classList.add('show-modal-add');
            modalAdd?.classList.remove('modal-hide');
        });
    }

    if (btnDelete) {
        btnDelete.forEach(element => {
            element.addEventListener('click', () => {
                modalDelete.classList.add('show-modal-add');
            })
        });
    }
    if (modalAdd) {
        modalAdd.addEventListener('click', () => {
            modalAdd.classList.remove('show-modal-add');
        });
    }
    if (modalDelete) {
        modalDelete.addEventListener('click', () => {
            modalDelete.classList.remove('show-confirm');
        });
    }
    if (closeModal) {
        closeModal.forEach(item => {
            item.addEventListener('click', () => {
                modalAdd.classList.remove('show-modal-add');
                modalDelete.classList.remove('show-confirm');
            });
        });
    }

    if (formAdd) {
        formAdd.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    if (formConfirm) {
        formConfirm.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

export function chooseUser() {
    const contentMessage = document.querySelectorAll('.content-message');

    if (contentMessage) {
        contentMessage.forEach(function (item) {
            item.addEventListener('click', function () {
                contentMessage.forEach(function (msg) {
                    msg.classList.remove('active');
                });
                item.classList.add('active');
            });
        });
    }
}

function showPassword() {
    const password = document.getElementById('password');
    const showPass = document.querySelector('.eye');
    const iconEye = document.querySelector('.eye i');

    if (showPass && password) {
        showPass.addEventListener('click', function () {
            if (password.type == "password") {
                password.type = "text";
                iconEye?.classList.remove('fa-eye-slash');
                iconEye?.classList.add('fa-eye');
            } else {
                password.type = "password";
                iconEye?.classList.add('fa-eye-slash');
                iconEye?.classList.remove('fa-eye');
            }
        });
    }
}

function main() {
    modal();
    chooseUser();
    showPassword();
}
main();
