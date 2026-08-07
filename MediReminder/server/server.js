"use strict";

/* =====================================================
                    MODULES
===================================================== */

const http = require("node:http");

const routes = require("./routes");

/* =====================================================
                    CONSTANTS
===================================================== */

const PORT = 3000;

/* =====================================================
                    CREATE SERVER
===================================================== */

const server = http.createServer(function (request, response) {

    console.log(`${request.method} ${request.url}`);

    /* ==============================
            CORS HEADERS
    ============================== */

    response.setHeader(

        "Access-Control-Allow-Origin",

        "*"

    );

    response.setHeader(

        "Access-Control-Allow-Methods",

        "GET, POST, PUT, DELETE, OPTIONS"

    );

    response.setHeader(

        "Access-Control-Allow-Headers",

        "Content-Type"

    );

    /* ==============================
            OPTIONS REQUEST
    ============================== */

    if (request.method === "OPTIONS") {

        response.writeHead(204);

        response.end();

        return;

    }

    /* ==============================
            HANDLE ROUTES
    ============================== */

    routes.handleRoutes(

        request,

        response

    );

});

/* =====================================================
                    START SERVER
===================================================== */

server.listen(PORT, function () {

    console.log(

        `Server running on http://localhost:${PORT}`

    );

});
