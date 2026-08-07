"use strict";

/* =====================================================
                    MEDIREMINDER
                  MEDICINE MODULE
===================================================== */

console.log("Medicine Module Loaded");

/* =====================================================
                    DOM ELEMENTS
===================================================== */

const medicineForm = document.getElementById("medicine-form");
const medicineList = document.getElementById("medicine-list");

const medicineNameInput = document.getElementById("medicine-name");
const dosageInput = document.getElementById("dosage");
const timeInput = document.getElementById("time");
const frequencyInput = document.getElementById("frequency");


/* =====================================================
                APPLICATION START
===================================================== */

initializeMedicine();


/* =====================================================
                INITIALIZE MODULE
===================================================== */

function initializeMedicine() {

    // Add Medicine Page

    if (medicineForm) {

        console.log("Add Medicine Page Detected");

        medicineForm.addEventListener("submit", handleMedicine);

    }

    // Medicines Page

    if (medicineList) {

        console.log("Medicines Page Detected");

        displayMedicines();

    }

}


/* =====================================================
                HANDLE MEDICINE
===================================================== */

function handleMedicine(event) {

    event.preventDefault();

    const medicine = getMedicineData();

    if (!validateMedicine(medicine)) {

        return;

    }

    saveMedicine(medicine);

    alert("Medicine Added Successfully!");

    medicineForm.reset();

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

        alert("Please fill in all fields.");

        return false;

    }

    return true;

}


/* =====================================================
                GET MEDICINES
===================================================== */

function getMedicines() {

    return JSON.parse(

        localStorage.getItem("medireminderMedicines")

    ) || [];

}


/* =====================================================
                SAVE MEDICINES
===================================================== */

function saveMedicines(medicines) {

    localStorage.setItem(

        "medireminderMedicines",

        JSON.stringify(medicines)

    );

}


/* =====================================================
                SAVE MEDICINE
===================================================== */

function saveMedicine(medicine) {

    const medicines = getMedicines();

    medicines.push(medicine);

    saveMedicines(medicines);

    console.log("Medicine Saved");

}


/* =====================================================
                DISPLAY MEDICINES
===================================================== */

function displayMedicines() {

    const medicines = getMedicines();

    medicineList.innerHTML = "";

    if (medicines.length === 0) {

        medicineList.innerHTML = `

            <p>No medicines added yet.</p>

        `;

        return;

    }

    medicines.forEach(function (medicine) {

        medicineList.innerHTML += `

            <div class="medicine-card">

                <h3>${medicine.medicineName}</h3>

                <p><strong>Dosage:</strong> ${medicine.dosage}</p>

                <p><strong>Time:</strong> ${medicine.time}</p>

                <p><strong>Frequency:</strong> ${medicine.frequency}</p>

                <p><strong>Status:</strong> ${medicine.status}</p>

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

            </div>

        `;

    });

}


/* =====================================================
                MARK AS TAKEN
===================================================== */

function markAsTaken(id) {

    const medicines = getMedicines();

    medicines.forEach(function (medicine) {

        if (medicine.id === id) {

            if (medicine.status === "Pending") {

                medicine.status = "Taken";

                saveHistory(medicine);

            }

        }

    });

    saveMedicines(medicines);

    displayMedicines();

}


/* =====================================================
                DELETE MEDICINE
===================================================== */

function deleteMedicine(id) {

    const medicines = getMedicines();

    const updatedMedicines = medicines.filter(function (medicine) {

        return medicine.id !== id;

    });

    saveMedicines(updatedMedicines);

    displayMedicines();

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
                SAVE HISTORIES
===================================================== */

function saveHistories(histories) {

    localStorage.setItem(

        "medireminderHistory",

        JSON.stringify(histories)

    );

}



/* =====================================================
                SAVE HISTORY
===================================================== */

function saveHistory(medicine) {

    const histories = getHistory();

    histories.push({

        id: Date.now(),

        medicineName: medicine.medicineName,

        dosage: medicine.dosage,

        time: medicine.time,

        frequency: medicine.frequency,

        status: medicine.status,

        completedAt: new Date().toLocaleString()

    });

    saveHistories(histories);

}


