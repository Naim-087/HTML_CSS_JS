"use strict";

/* =====================================================
                    MEDIREMINDER
                    APPLICATION MODULE
===================================================== */

console.log("Application Module Loaded");

/* =====================================================
                    LOGOUT
===================================================== */

function logout() {

    const confirmLogout = confirm(

        "Are you sure you want to logout?"

    );

    if (!confirmLogout) {

        return;

    }


    /* =============================================
                    REMOVE SESSION
    ============================================= */

    localStorage.removeItem("currentUser");


    /* =============================================
                    REDIRECT
    ============================================= */

    window.location.href = "login.html";

}

/* =====================================================
                    CHECK LOGIN
===================================================== */

function isUserLoggedIn() {

    return localStorage.getItem(

        "currentUser"

    ) !== null;

}


/* =====================================================
                    PROTECT PAGE
===================================================== */

function protectPage() {

    if (!isUserLoggedIn()) {

        alert("Please login first.");

        window.location.href = "login.html";

        return false;

    }

    return true;

}