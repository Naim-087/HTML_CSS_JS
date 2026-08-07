"use strict";

/* =====================================================
                    MODULES
===================================================== */

const database = require("./database");

const parser = require("./parser");

/* =====================================================
                    HANDLE ROUTES
===================================================== */

async function handleRoutes(request, response) {

    /* =================================================
                        HOME
    ================================================= */

    if (

        request.method === "GET" &&

        request.url === "/"

    ) {

        response.writeHead(200, {

            "Content-Type": "application/json"

        });

        response.end(

            JSON.stringify({

                message: "Welcome to MediReminder Backend"

            })

        );

        return;

    }

    /* =================================================
                        SIGNUP
    ================================================= */

    if (

        request.method === "POST" &&

        request.url === "/signup"

    ) {

        try {

            const user = await parser.parseRequestBody(request);

            const users = database.readData(

                database.USERS_FILE

            );

            /* =========================================
                    CHECK DUPLICATE EMAIL
            ========================================= */

            const existingUser = users.find(function (item) {

                return item.email === user.email;

            });

            if (existingUser) {

                response.writeHead(400, {

                    "Content-Type": "application/json"

                });

                response.end(

                    JSON.stringify({

                        success: false,

                        message: "Email already exists."

                    })

                );

                return;

            }

            users.push(user);

            database.writeData(

                database.USERS_FILE,

                users

            );

            response.writeHead(201, {

                "Content-Type": "application/json"

            });

            response.end(

                JSON.stringify({

                    success: true,

                    message: "Account Created Successfully."

                })

            );

        }

        catch (error) {

            response.writeHead(400, {

                "Content-Type": "application/json"

            });

            response.end(

                JSON.stringify({

                    success: false,

                    message: "Invalid Request"

                })

            );

        }

        return;

    }

    /* =================================================
                    ROUTE NOT FOUND
    ================================================= */

    response.writeHead(404, {

        "Content-Type": "application/json"

    });

    response.end(

        JSON.stringify({

            message: "Route Not Found"

        })

    );

}

/* =====================================================
                    EXPORT
===================================================== */

module.exports = {

    handleRoutes

};

