"use strict";

/* ================
                MEDIREMINDER
              MEDICINE MODULE
=================== */

console.log("Medicine Module Loaded");

/* 
===========================
                    DOM ELEMENTS        
========================== */

const medicineForm = document.getElementById("medicine-form");

const medicineNameInput = document.getElementById("medicine-name");

const dosageInput = document.getElementById("dosage");

const timeInput = document.getElementById("time");

const frequencyInput = document.getElementById("frequency");


initializeMedicine();


/* =====================================================
                INITIALIZE
===================================================== */

function initializeMedicine() {

    if (!medicineForm) {

        return;

    }

    console.log("Add Medicine Page Detected");

    medicineForm.addEventListener("submit", handleMedicine);

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
                VALIDATE
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

    console.log(medicines);

}




