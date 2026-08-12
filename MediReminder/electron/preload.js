"use strict";

/* =====================================================
                    MEDIREMINDER
                    ELECTRON PRELOAD
===================================================== */

const {
    contextBridge
} = require("electron");


/* =====================================================
                    DESKTOP API
===================================================== */

contextBridge.exposeInMainWorld(

    "desktopAPI",

    {

        appName: "MediReminder",

        version: "1.0.0"

    }

);