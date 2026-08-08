"use strict";

/* =====================================================
                    MODULES
===================================================== */

const fs = require("node:fs");

const path = require("node:path");


/* =====================================================
                DATABASE FILE PATHS
===================================================== */

const DATA_FOLDER = path.join(

    __dirname,

    "data"

);


const USERS_FILE = path.join(

    DATA_FOLDER,

    "users.json"

);


const MEDICINES_FILE = path.join(

    DATA_FOLDER,

    "medicine.json"

);


const HISTORY_FILE = path.join(

    DATA_FOLDER,

    "history.json"

);


/* =====================================================
                    READ DATA
===================================================== */

function readData(filePath) {

    const data = fs.readFileSync(

        filePath,

        "utf8"

    );

    return JSON.parse(data || "[]");

}


/* =====================================================
                    WRITE DATA
===================================================== */

function writeData(filePath, data) {

    fs.writeFileSync(

        filePath,

        JSON.stringify(data, null, 4),

        "utf8"

    );

}


/* =====================================================
                EXPORT MODULE
===================================================== */

module.exports = {

    USERS_FILE,

    MEDICINES_FILE,

    HISTORY_FILE,

    readData,

    writeData

};