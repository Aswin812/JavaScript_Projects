let email;
let password;
let emailErrorBox;
let passwordErrorBox;
let captchaBox;
let captcha;
let captchaErrorBox;
let form;


window.onload = () => {
    localStorage.setItem("email", "aswin08@gmail.com");
    localStorage.setItem("password", "@Aswin812");
}

document.addEventListener("DOMContentLoaded", (event) => {
    email = document.querySelector("#email");
    password = document.querySelector("#password");
    emailErrorBox = document.querySelector("#email-errorbox");
    passwordErrorBox = document.querySelector("#password-errorbox");
    captchaBox = document.querySelector("#captchaBox");
    captcha = document.querySelector("#captcha");
    captchaErrorBox = document.querySelector("#captcha-errorbox");
    form = document.querySelector("#form");

    email.addEventListener("input", (event) => {
        emailValidation(event.target);
    })

    password.addEventListener("input", (event) => {
        passwordValidation(event.target.value);
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        formValidation(email.value, password.value, captcha.value);
    })
    generateCaptcha();

})

function emailValidation(e) {
    let errMsg;
    emailErrorBox.style.color = "red";
    if (e.value == "") {
        errMsg = "Enter email";
    }
    else if (!e.value.includes("@")) {
        errMsg = "Email contains alteast one @"
    }
    else if (!/^\S+$/.test(e.value)) {
        errMsg = "email should not contain spaces"
    }
    else if (!e.validity.valid) {
        errMsg = "Enter valid email";
    }
    else {
        emailErrorBox.style.color = "green";
        errMsg = "Correct";
    }
    emailErrorBox.textContent = errMsg;
}

function passwordValidation(pass) {
    let errMsg;
    passwordErrorBox.style.color = "red";
    if (pass === "") {
        errMsg = "Enter Password";
    }
    else if (!/^\S+$/.test(pass)) {
        errMsg = "Password should not contain spaces"
    }
    else if (pass.length < 8) {
        errMsg = "Password is too short !"
    }
    else if (!/[A-Z]/.test(pass)) {
        errMsg = "Password must contain uppercase letter"
    }
    else if (!/[a-z]/.test(pass)) {
        errMsg = "Password must contain lowercase letter"
    }
    else if (!/\d/.test(pass)) {
        errMsg = "Password must contain number";
    }
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(pass)) {
        errMsg = "Password must contaion special character"
    }
    else {
        errMsg = "Correct";
        passwordErrorBox.style.color = "green";
    }


    passwordErrorBox.textContent = errMsg;
}

function formValidation(e, pass, cap) {
    let errBox = document.querySelector("#invalid");
    if (localStorage.getItem("email") === e && localStorage.getItem("password") === pass && captchaBox.textContent === cap) {
        form.submit();
    }
    else {
        errBox.textContent = "Email or Password are inncorrect !";
    }
    if (cap !== captchaBox.textContent) {
        captchaErrorBox.textContent = "captcha not matched !"
        captcha.value = "";
    }

    generateCaptcha();
}


function generateCaptcha() {
    let c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let cap = "";
    for (let i = 0; i < 5; i++) {
        cap += c[Math.floor(Math.random() * 62)];
    }
    captchaBox.textContent = cap;
}
