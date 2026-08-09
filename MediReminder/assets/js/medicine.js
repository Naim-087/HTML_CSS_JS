"use strict";

/* =====================================================
                    MEDIREMINDER
                    MEDICINE MODULE
===================================================== */

console.log("Medicine Module Loaded");


/* =====================================================
                    DOM ELEMENTS
===================================================== */

const medicineForm = document.getElementById(
    "medicine-form"
);

const medicineList = document.getElementById(
    "medicine-list"
);

const medicineNameInput = document.getElementById(
    "medicine-name"
);

const dosageInput = document.getElementById(
    "dosage"
);

const timeInput = document.getElementById(
    "time"
);

const frequencyInput = document.getElementById(
    "frequency"
);


/* =====================================================
                    BACKEND URL
===================================================== */

const API_URL = "http://localhost:3000";


/* =====================================================
                    APPLICATION START
===================================================== */

initializeMedicine();


/* =====================================================
                    INITIALIZE
===================================================== */

function initializeMedicine() {

    console.log("Medicine Module Initialized");


    /* =============================================
                    ADD MEDICINE PAGE
    ============================================= */

    if (medicineForm) {

        console.log("Add Medicine Page Detected");

        medicineForm.addEventListener(

            "submit",

            handleMedicine

        );

    }


    /* =============================================
                    MEDICINES PAGE
    ============================================= */

    if (medicineList) {

        console.log("Medicines Page Detected");

        displayMedicines();

    }

}


/* =====================================================
                    HANDLE MEDICINE
===================================================== */

async function handleMedicine(event) {

    event.preventDefault();

    console.log("Add Medicine Button Clicked");


    const medicine = getMedicineData();


    /* =============================================
                    VALIDATION
    ============================================= */

    if (!validateMedicine(medicine)) {

        return;

    }


    try {

        const response = await fetch(

            `${API_URL}/medicines`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    "Accept": "application/json"

                },

                body: JSON.stringify(medicine)

            }

        );


        const result = await response.json();


        console.log(

            "Backend Response:",

            result

        );


        /* =========================================
                    BACKEND ERROR
        ========================================= */

        if (!response.ok) {

            alert(result.message);

            return;

        }


        /* =========================================
                    SUCCESS
        ========================================= */

        alert(

            "Medicine Added Successfully!"

        );


        medicineForm.reset();

    }

    catch (error) {

        console.error(

            "Add Medicine Error:",

            error

        );

        alert(

            "Unable to connect to the server. " +

            "Please make sure the Node.js server is running."

        );

    }

}


/* =====================================================
                    GET MEDICINE DATA
===================================================== */

function getMedicineData() {

    return {

        id: Date.now(),

        medicineName: medicineNameInput.value.trim(),

        dosage: dosageInput.value.trim(),

        time: timeInput.value,

        frequency: frequencyInput.value,

        status: "Pending"

    };

}


/* =====================================================
                    VALIDATE MEDICINE
===================================================== */

function validateMedicine(medicine) {

    if (

        !medicine.medicineName ||

        !medicine.dosage ||

        !medicine.time ||

        !medicine.frequency

    ) {

        alert(

            "Please fill in all fields."

        );

        return false;

    }

    return true;

}


/* =====================================================
                    GET MEDICINES
===================================================== */

async function getMedicines() {

    try {

        const response = await fetch(

            `${API_URL}/medicines`

        );


        const result = await response.json();


        console.log(

            "Medicines Response:",

            result

        );


        if (!response.ok) {

            alert(result.message);

            return [];

        }


        return result.medicines || [];

    }

    catch (error) {

        console.error(

            "Get Medicines Error:",

            error

        );

        alert(

            "Unable to connect to the server."

        );

        return [];

    }

}


/* =====================================================
                    DISPLAY MEDICINES
===================================================== */

async function displayMedicines() {

    const medicines = await getMedicines();


    medicineList.innerHTML = "";


    /* =============================================
                    EMPTY STATE
    ============================================= */

    if (medicines.length === 0) {

        medicineList.innerHTML = `

            <p class="empty-state">

                No medicines added yet.

            </p>

        `;

        return;

    }


    /* =============================================
                    DISPLAY CARDS
    ============================================= */

    medicines.forEach(function (medicine) {

        medicineList.innerHTML += `

            <article class="medicine-card">

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

                <p>

                    <strong>Status:</strong>

                    ${medicine.status}

                </p>

                <div class="medicine-actions">

                    <button
                        class="taken-btn"
                        onclick="markAsTaken(${medicine.id})">

                        Mark as Taken

                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteMedicine(${medicine.id})">

                        Delete

                    </button>

                </div>

            </article>

        `;

    });

}



/* =====================================================
                    DELETE MEDICINE
===================================================== */

async function deleteMedicine(id) {

    const confirmDelete = confirm(

        "Are you sure you want to delete this medicine?"

    );


    if (!confirmDelete) {

        return;

    }


    try {

        const response = await fetch(

            `${API_URL}/medicines/${id}`,

            {

                method: "DELETE"

            }

        );


        const result = await response.json();


        console.log(

            "Delete Response:",

            result

        );


        /* =============================================
                    BACKEND ERROR
        ============================================= */

        if (!response.ok) {

            alert(result.message);

            return;

        }


        /* =============================================
                    SUCCESS
        ============================================= */

        alert(

            "Medicine deleted successfully."

        );


        /* =============================================
                    REFRESH MEDICINE LIST
        ============================================= */

        displayMedicines();

    }

    catch (error) {

        console.error(

            "Delete Medicine Error:",

            error

        );

        alert(

            "Unable to connect to the server."

        );

    }

}




/* =====================================================
                    MARK AS TAKEN
===================================================== */

async function markAsTaken(id) {

    const confirmTaken = confirm(

        "Mark this medicine as taken?"

    );


    if (!confirmTaken) {

        return;

    }


    try {

        /* =============================================
                    FIND MEDICINE
        ============================================= */

        const medicines = await getMedicines();

        const medicine = medicines.find(

            function (item) {

                return String(item.id) === String(id);

            }

        );


        if (!medicine) {

            alert("Medicine not found.");

            return;

        }


        /* =============================================
                    UPDATE MEDICINE
        ============================================= */

        const updateResponse = await fetch(

            `${API_URL}/medicines/${id}`,

            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    status: "Taken",

                    takenAt: new Date().toISOString()

                })

            }

        );


        const updateResult =

            await updateResponse.json();


        if (!updateResponse.ok) {

            alert(updateResult.message);

            return;

        }


        /* =============================================
                    CREATE HISTORY RECORD
        ============================================= */

        const historyRecord = {

            medicineId: medicine.id,

            medicineName: medicine.medicineName,

            dosage: medicine.dosage,

            scheduledTime: medicine.time,

            status: "Taken",

            takenAt: new Date().toISOString()

        };


        const historyResponse = await fetch(

            `${API_URL}/history`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(historyRecord)

            }

        );


        const historyResult =

            await historyResponse.json();


        if (!historyResponse.ok) {

            alert(historyResult.message);

            return;

        }


        /* =============================================
                    SUCCESS
        ============================================= */

        alert(

            "Medicine marked as taken."

        );


        displayMedicines();

    }

    catch (error) {

        console.error(

            "Mark as Taken Error:",

            error

        );

        alert(

            "Unable to connect to the server."

        );

    }

}
