"use strict";

/* =====================================================
                    MEDIREMINDER
                    HISTORY MODULE
===================================================== */

console.log("History Module Loaded");

/* =====================================================
                    DOM ELEMENTS
===================================================== */

const historyList = document.getElementById("history-list");

/* =====================================================
                    APPLICATION START
===================================================== */

initializeHistory();

/* =====================================================
                    INITIALIZE
===================================================== */

function initializeHistory() {

    if (!historyList) {

        return;

    }

    console.log("History Page Detected");

    displayHistory();

}

/* =====================================================
                    GET HISTORY
===================================================== */

function getHistory() {

    return JSON.parse(

        localStorage.getItem("medireminderHistory")

    ) || [];

}

/* =====================================================
                    DISPLAY HISTORY
===================================================== */

function displayHistory() {

    const histories = getHistory();

    historyList.innerHTML = "";

    if (histories.length === 0) {

        historyList.innerHTML = `

            <p class="empty-state">

                No medicine history available.

            </p>

        `;

        return;

    }

    histories.reverse().forEach(function (history) {

        historyList.innerHTML += `

            <article class="history-card">

                <h3>

                    💊 ${history.medicineName}

                </h3>

                <p>

                    <strong>Dosage:</strong>

                    ${history.dosage}

                </p>

                <p>

                    <strong>Time:</strong>

                    ${history.time}

                </p>

                <p>

                    <strong>Frequency:</strong>

                    ${history.frequency}

                </p>

                <p>

                    <strong>Status:</strong>

                    ${history.status}

                </p>

                <p>

                    <strong>Completed:</strong>

                    ${history.completedAt}

                </p>

            </article>

        `;

    });

}