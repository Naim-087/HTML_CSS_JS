"use strict";

/* =====================================================
                    MEDIREMINDER
                AUTHENTICATION MODULE
===================================================== */

console.log("Authentication Module Loaded");

/* =====================================================
                    DOM ELEMENTS
===================================================== */

// Signup Form

const signupForm = document.getElementById("signup-form");

const fullNameInput = document.getElementById("full-name");

const emailInput = document.getElementById("email");

const phoneInput = document.getElementById("phone");

const ageInput = document.getElementById("age");

const genderInput = document.getElementById("gender");

const passwordInput = document.getElementById("password");

const confirmPasswordInput = document.getElementById("confirm-password");

const termsCheckbox = document.getElementById("terms");

const signupButton = document.getElementById("signup-btn");



// Login Form

const loginForm = document.getElementById("login-form");

const loginEmailInput = document.getElementById("login-email");

const loginPasswordInput = document.getElementById("login-password");

const loginButton = document.getElementById("login-btn");


/* =====================================================
                APPLICATION START
===================================================== */

initializeAuth();






/* =====================================================
                INITIALIZE AUTH
===================================================== */

function initializeAuth() {

    console.log("Authentication Initialized");

    initializeSignup();

    initializeLogin();

}






/* =====================================================
                SIGNUP INITIALIZATION
===================================================== */

function initializeSignup() {

    if (!signupForm) {

        return;

    }

    console.log("Signup Page Detected");

    signupForm.addEventListener("submit", handleSignup);

}





/* =====================================================
                LOGIN INITIALIZATION
===================================================== */

function initializeLogin() {

    if (!loginForm) {

        return;

    }

    console.log("Login Page Detected");

    loginForm.addEventListener("submit", handleLogin);

}





/* =====================================================
                    HANDLE SIGNUP
===================================================== */

async function handleSignup(event) {

    event.preventDefault();

    console.log("Signup Button Clicked");

    const user = getSignupData();

    if (!validateSignup(user)) {

        return;

    }

    try {

        const response = await fetch(

            "http://localhost:3000/signup",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    id: user.id,

                    fullName: user.fullName,

                    email: user.email,

                    phone: user.phone,

                    age: user.age,

                    gender: user.gender,

                    password: user.password,

                    createdAt: user.createdAt

                })

            }

        );

        const result = await response.json();

        console.log("Backend Response:", result);

        if (!response.ok) {

            alert(result.message);

            return;

        }

        alert("Account Created Successfully!");

        signupForm.reset();

        window.location.href = "login.html";

    }

    catch (error) {

        console.error("Signup Error:", error);

        alert(

            "Unable to connect to the server. " +

            "Please make sure the Node.js server is running."

        );

    }

}





/* =====================================================
                GET SIGNUP DATA
===================================================== */

function getSignupData() {

    return {

        id: Date.now(),

        fullName: fullNameInput.value.trim(),

        email: emailInput.value.trim().toLowerCase(),

        phone: phoneInput.value.trim(),

        age: Number(ageInput.value),

        gender: genderInput.value,

        password: passwordInput.value,

        confirmPassword: confirmPasswordInput.value,

        termsAccepted: termsCheckbox.checked,

        createdAt: new Date().toISOString()

    };

}






/* =====================================================
                VALIDATE SIGNUP
===================================================== */

function validateSignup(user) {

    if (
        !user.fullName ||
        !user.email ||
        !user.phone ||
        !user.age ||
        !user.gender ||
        !user.password ||
        !user.confirmPassword
    ) {

        alert("Please fill in all fields.");
        return false;

    }

    if (user.password.length < 8) {

        alert("Password must be at least 8 characters.");
        return false;

    }

    if (user.password !== user.confirmPassword) {

        alert("Passwords do not match.");
        return false;

    }

    if (user.age < 1 || user.age > 120) {

        alert("Please enter a valid age.");
        return false;

    }

    if (user.phone.length < 11) {

        alert("Please enter a valid phone number.");
        return false;

    }

    if (!user.termsAccepted) {

        alert("Please accept the Terms and Conditions.");
        return false;

    }

    return true;

}



/* =====================================================
                SAVE USER
===================================================== */

function saveUser(user) {

    const users = getUsers();

    const userExists = users.some(existingUser => {

        return existingUser.email === user.email;

    });

    if (userExists) {

        alert("An account with this email already exists.");
        return false;

    }

    const userData = {

        id: user.id,

        fullName: user.fullName,

        email: user.email,

        phone: user.phone,

        age: user.age,

        gender: user.gender,

        password: user.password,

        createdAt: user.createdAt

    };

    users.push(userData);

    saveUsers(users);

    console.log("Current Users:", users);

    return true;

}



/* =====================================================
                GET ALL USERS
===================================================== */

function getUsers() {

    return JSON.parse(

        localStorage.getItem("medireminderUsers")

    ) || [];

}






/* =====================================================
                SAVE ALL USERS
===================================================== */

function saveUsers(users) {

    localStorage.setItem(

        "medireminderUsers",

        JSON.stringify(users)

    );

}











/* =====================================================
                HANDLE LOGIN
===================================================== */

function handleLogin(event) {

    event.preventDefault();

    console.log("Login Button Clicked");

    const loginData = getLoginData();

    if (!validateLogin(loginData)) {

        return;

    }

    const user = authenticateUser(loginData);

    if (!user) {

        alert("Invalid email or password.");

        return;

    }

    createSession(user);

    alert("Login Successful!");

    window.location.href = "dashboard.html";

}






/* =====================================================
                GET LOGIN DATA
===================================================== */

function getLoginData() {

    return {

        email: loginEmailInput.value.trim().toLowerCase(),

        password: loginPasswordInput.value

    };

}








/* =====================================================
                VALIDATE LOGIN
===================================================== */

function validateLogin(loginData) {

    if (!loginData.email || !loginData.password) {

        alert("Please enter your email and password.");

        return false;

    }

    return true;

}








/* =====================================================
                AUTHENTICATE USER
===================================================== */

function authenticateUser(loginData) {

    const users = getUsers();

    const user = users.find(existingUser => {

        return (

            existingUser.email === loginData.email &&

            existingUser.password === loginData.password

        );

    });

    return user || null;

}







/* =====================================================
                CREATE SESSION
===================================================== */

function createSession(user) {

    localStorage.setItem(

        "currentUser",

        JSON.stringify(user)

    );

    console.log("User Logged In");

}



