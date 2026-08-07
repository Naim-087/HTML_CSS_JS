"use strict";

/* =====================================================
                    MEDIREMINDER
                    PROFILE MODULE
===================================================== */

console.log("Profile Module Loaded");

/* =====================================================
                    DOM ELEMENTS
===================================================== */

const profileName = document.getElementById("profile-name");

const profileEmail = document.getElementById("profile-email");

const profilePhone = document.getElementById("profile-phone");

const profileAge = document.getElementById("profile-age");

const profileGender = document.getElementById("profile-gender");

const profileCreated = document.getElementById("profile-created");

/* =====================================================
                    APPLICATION START
===================================================== */

initializeProfile();

/* =====================================================
                    INITIALIZE
===================================================== */

function initializeProfile() {

    console.log("Profile Page Detected");

    loadProfile();

}

/* =====================================================
                GET CURRENT USER
===================================================== */

function getCurrentUser() {

    return JSON.parse(

        localStorage.getItem("currentUser")

    );

}

/* =====================================================
                LOAD PROFILE
===================================================== */

function loadProfile() {

    const user = getCurrentUser();

    if (!user) {

        alert("Please login first.");

        window.location.href = "login.html";

        return;

    }

    profileName.textContent = user.fullName;

    profileEmail.textContent = user.email;

    profilePhone.textContent = user.phone;

    profileAge.textContent = user.age;

    profileGender.textContent = user.gender;

    profileCreated.textContent = formatDate(user.createdAt);

}

/* =====================================================
                FORMAT DATE
===================================================== */

function formatDate(date) {

    return new Date(date).toLocaleDateString(

        "en-GB",

        {

            day: "2-digit",

            month: "long",

            year: "numeric"

        }

    );

}
