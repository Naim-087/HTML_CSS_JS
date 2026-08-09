"use strict";

/* =====================================================
                    MEDIREMINDER
                    HISTORY MODULE
===================================================== */

console.log("History Module Loaded");


/* =====================================================
                    DOM ELEMENTS
===================================================== */

const historyList = document.querySelector(

    ".history-list"

);

const searchHistoryInput = document.getElementById(

    "search-history"

);

const historyStatusSelect = document.getElementById(

    "history-status"

);


/* =====================================================
                    BACKEND URL
===================================================== */

const API_URL = "http://localhost:3000";


/* =====================================================
                    HISTORY DATA
===================================================== */

let historyRecords = [];


/* =====================================================
                    APPLICATION START
===================================================== */

initializeHistory();


/* =====================================================
                    INITIALIZE
===================================================== */

function initializeHistory() {

    console.log(

        "History Module Initialized"

    );


    if (!historyList) {

        return;

    }


    loadHistory();


    /* =============================================
                    SEARCH
    ============================================= */

    if (searchHistoryInput) {

        searchHistoryInput.addEventListener(

            "input",

            filterHistory

        );

    }


    /* =============================================
                    STATUS FILTER
    ============================================= */

    if (historyStatusSelect) {

        historyStatusSelect.addEventListener(

            "change",

            filterHistory

        );

    }

}


/* =====================================================
                    GET HISTORY
===================================================== */

async function getHistory() {

    try {

        const response = await fetch(

            `${API_URL}/history`

        );


        const result = await response.json();


        console.log(

            "History Response:",

            result

        );


        if (!response.ok) {

            alert(result.message);

            return [];

        }


        return result.history || [];

    }

    catch (error) {

        console.error(

            "Get History Error:",

            error

        );

        alert(

            "Unable to connect to the server."

        );

        return [];

    }

}


/* =====================================================
                    LOAD HISTORY
===================================================== */

async function loadHistory() {

    historyRecords = await getHistory();

    displayHistory(historyRecords);

}


/* =====================================================
                    DISPLAY HISTORY
===================================================== */

function displayHistory(records) {

    historyList.innerHTML = "";


    /* =============================================
                    EMPTY STATE
    ============================================= */

    if (records.length === 0) {

        historyList.innerHTML = `

            <p class="empty-state">

                No medicine history available.

            </p>

        `;

        return;

    }


    /* =============================================
                    HISTORY CARDS
    ============================================= */

    records.forEach(function (record) {

        historyList.innerHTML += `

            <article class="card history-card">

                <h3>

                    ${record.medicineName}

                </h3>

                <p>

                    <strong>Status:</strong>

                    ${record.status}

                </p>

                <p>

                    <strong>Dosage:</strong>

                    ${record.dosage}

                </p>

                <p>

                    <strong>Date:</strong>

                    ${formatDate(record.takenAt)}

                </p>

                <p>

                    <strong>Time:</strong>

                    ${formatTime(record.takenAt)}

                </p>

            </article>

        `;

    });

}


/* =====================================================
                    FILTER HISTORY
===================================================== */

function filterHistory() {

    const searchValue =

        searchHistoryInput

            ? searchHistoryInput.value

                .trim()

                .toLowerCase()

            : "";


    const statusValue =

        historyStatusSelect

            ? historyStatusSelect.value

            : "";


    const filteredRecords = historyRecords.filter(

        function (record) {

            const medicineName =

                record.medicineName

                    .toLowerCase();


            const matchesSearch =

                medicineName.includes(

                    searchValue

                );


            const matchesStatus =

                !statusValue ||

                record.status === statusValue;


            return (

                matchesSearch &&

                matchesStatus

            );

        }

    );


    displayHistory(filteredRecords);

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


/* =====================================================
                    FORMAT TIME
===================================================== */

function formatTime(date) {

    return new Date(date).toLocaleTimeString(

        "en-US",

        {

            hour: "numeric",

            minute: "2-digit"

        }

    );

}

