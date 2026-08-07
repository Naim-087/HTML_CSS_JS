"use strict";

/* =====================================================
                    MEDIREMINDER
                  DASHBOARD MODULE
===================================================== */

console.log("Dashboard Module Loaded");


/* =====================================================
                    DOM ELEMENTS
===================================================== */

const welcomeMessage = document.getElementById("welcome-message");

const totalMedicines = document.getElementById("total-medicines");

const recentMedicineList = document.getElementById("recent-medicine-list");


initializeDashboard();


/* =====================================================
                INITIALIZE
===================================================== */

function initializeDashboard() {

    loadUser();

    loadStatistics();

    loadRecentMedicines();

}


/* =====================================================
                LOAD USER
===================================================== */

function loadUser() {

    const currentUser = JSON.parse(

        localStorage.getItem("currentUser")

    );

    if (!currentUser) {

        return;

    }

    welcomeMessage.textContent =

        `Welcome Back, ${currentUser.fullName}!`;

}


/* =====================================================
                LOAD STATISTICS
===================================================== */

function loadStatistics() {

    const medicines = JSON.parse(

        localStorage.getItem("medireminderMedicines")

    ) || [];

    totalMedicines.textContent = medicines.length;

}


/* =====================================================
            LOAD RECENT MEDICINES
===================================================== */

function loadRecentMedicines() {

    const medicines = JSON.parse(

        localStorage.getItem("medireminderMedicines")

    ) || [];

    recentMedicineList.innerHTML = "";

    if (medicines.length === 0) {

        recentMedicineList.innerHTML =

            "<p>No medicines added yet.</p>";

        return;

    }

    medicines.slice(-5).reverse().forEach(function (medicine) {

        recentMedicineList.innerHTML += `

            <div class="medicine-card">

                <h3>${medicine.medicineName}</h3>

                <p>${medicine.dosage}</p>

                <p>${medicine.time}</p>

            </div>

        `;

    });

}