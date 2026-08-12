"use strict";

/* =====================================================
                    MEDIREMINDER
                    ELECTRON MAIN
===================================================== */

const {
    app,
    BrowserWindow
} = require("electron");

const path = require("node:path");


/* =====================================================
                    START NODE SERVER
===================================================== */

require("../server/server");


/* =====================================================
                    CREATE WINDOW
===================================================== */

function createWindow() {

    const mainWindow = new BrowserWindow({

        width: 1200,

        height: 800,

        minWidth: 900,

        minHeight: 600,

        title: "MediReminder",

        webPreferences: {

            preload: path.join(

                __dirname,

                "preload.js"

            ),

            contextIsolation: true,

            nodeIntegration: false

        }

    });


    /* =================================================
                    LOAD HOME PAGE
    ================================================= */

    mainWindow.loadFile(

        path.join(

            __dirname,

            "../pages/index.html"

        )

    );

}


/* =====================================================
                    APPLICATION READY
===================================================== */

app.whenReady().then(function () {

    createWindow();

});


/* =====================================================
                    CLOSE APPLICATION
===================================================== */

app.on(

    "window-all-closed",

    function () {

        if (process.platform !== "darwin") {

            app.quit();

        }

    }

);
