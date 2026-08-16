"use strict";

/* =====================================================
                    MEDIREMINDER
                    DASHBOARD MODULE
===================================================== */

console.log("Dashboard Module Loaded");


/* =====================================================
                    PROTECT PAGE
===================================================== */

protectPage();


/* =====================================================
                    DOM ELEMENTS
===================================================== */

const welcomeMessage = document.getElementById(
    "welcome-message"
);

const totalMedicinesElement = document.getElementById(
    "total-medicines"
);

const takenMedicinesElement = document.getElementById(
    "taken-medicines"
);

const pendingMedicinesElement = document.getElementById(
    "pending-medicines"
);

const recentMedicineList = document.getElementById(
    "recent-medicine-list"
);


/* =====================================================
                    BACKEND URL
===================================================== */

const API_URL = "http://localhost:3000";


/* =====================================================
                    APPLICATION START
===================================================== */

initializeDashboard();


/* =====================================================
                    INITIALIZE DASHBOARD
===================================================== */

async function initializeDashboard() {

    console.log(
        "Dashboard Initialized"
    );


    /* =============================================
                    WELCOME MESSAGE
    ============================================= */

    displayWelcomeMessage();


    /* =============================================
                    LOAD DASHBOARD DATA
    ============================================= */

    await loadDashboardData();

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
                    DISPLAY WELCOME MESSAGE
===================================================== */

function displayWelcomeMessage() {

    const currentUser = getCurrentUser();


    if (!currentUser) {

        return;

    }


    if (welcomeMessage) {

        welcomeMessage.textContent =

            `Welcome, ${currentUser.fullName}!`;

    }

}


/* =====================================================
                    GET USER MEDICINES
===================================================== */

async function getMedicines() {

    const currentUser = getCurrentUser();


    /* =============================================
                    NO USER
    ============================================= */

    if (!currentUser) {

        return [];

    }


    try {

        const response = await fetch(

            `${API_URL}/medicines?userId=${currentUser.id}`

        );


        const result = await response.json();


        console.log(
            "Dashboard Medicines:",
            result
        );


        if (!response.ok) {

            console.error(

                "Medicine Error:",

                result.message

            );

            return [];

        }


        return result.medicines || [];

    }

    catch (error) {

        console.error(

            "Get Medicines Error:",

            error

        );

        return [];

    }

}


/* =====================================================
                    GET USER HISTORY
===================================================== */

async function getHistory() {

    const currentUser = getCurrentUser();


    /* =============================================
                    NO USER
    ============================================= */

    if (!currentUser) {

        return [];

    }


    try {

        const response = await fetch(

            `${API_URL}/history?userId=${currentUser.id}`

        );


        const result = await response.json();


        console.log(
            "Dashboard History:",
            result
        );


        if (!response.ok) {

            console.error(

                "History Error:",

                result.message

            );

            return [];

        }


        return result.history || [];

    }

    catch (error) {

        console.error(

            "Get History Error:",

            error

        );

        return [];

    }

}


/* =====================================================
                    LOAD DASHBOARD DATA
===================================================== */

async function loadDashboardData() {

    const medicines = await getMedicines();

    const history = await getHistory();


    /* =============================================
                    UPDATE STATISTICS
    ============================================= */

    updateStatistics(

        medicines,

        history

    );


    /* =============================================
                    RECENT MEDICINES
    ============================================= */

    displayRecentMedicines(

        medicines

    );

}


/* =====================================================
                    UPDATE STATISTICS
===================================================== */

function updateStatistics(

    medicines,

    history

) {

    const totalMedicines =

        medicines.length;


    const takenMedicines =

        medicines.filter(

            function (medicine) {

                return (

                    medicine.status ===

                    "Taken"

                );

            }

        ).length;


    const pendingMedicines =

        medicines.filter(

            function (medicine) {

                return (

                    medicine.status ===

                    "Pending"

                );

            }

        ).length;


    /* =============================================
                    TOTAL
    ============================================= */

    if (totalMedicinesElement) {

        totalMedicinesElement.textContent =

            totalMedicines;

    }


    /* =============================================
                    TAKEN
    ============================================= */

    if (takenMedicinesElement) {

        takenMedicinesElement.textContent =

            takenMedicines;

    }


    /* =============================================
                    PENDING
    ============================================= */

    if (pendingMedicinesElement) {

        pendingMedicinesElement.textContent =

            pendingMedicines;

    }

}


/* =====================================================
                    RECENT MEDICINES
===================================================== */

function displayRecentMedicines(

    medicines

) {

    if (!recentMedicineList) {

        return;

    }


    recentMedicineList.innerHTML = "";


    /* =============================================
                    EMPTY STATE
    ============================================= */

    if (medicines.length === 0) {

        recentMedicineList.innerHTML = `

            <p class="empty-state">

                No medicines added yet.

            </p>

        `;

        return;

    }


    /* =============================================
                    GET RECENT MEDICINES
    ============================================= */

    const recentMedicines =

        medicines

            .slice(-5)

            .reverse();


    /* =============================================
                    DISPLAY
    ============================================= */

    recentMedicines.forEach(

        function (medicine) {

            const statusClass =

                medicine.status

                    .toLowerCase();


            recentMedicineList.innerHTML += `

                <article class="recent-card">

                    <h3>

                        ${medicine.medicineName}

                    </h3>


                    <p>

                        <strong>Dosage:</strong>

                        ${medicine.dosage}

                    </p>


                    <p>

                        <strong>Time:</strong>

                        ${medicine.time}

                    </p>


                    <p>

                        <strong>Frequency:</strong>

                        ${medicine.frequency}

                    </p>


                    <p class="status ${statusClass}">

                        ${medicine.status}

                    </p>

                </article>

            `;

        }

    );

}