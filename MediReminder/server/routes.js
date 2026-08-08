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
                    LOGIN
================================================= */

if (

    request.method === "POST" &&

    request.url === "/login"

) {

    try {

        const loginData = await parser.parseRequestBody(request);

        const users = database.readData(

            database.USERS_FILE

        );

        /* =========================================
                FIND USER
        ========================================= */

        const user = users.find(function (item) {

            return (

                item.email === loginData.email &&

                item.password === loginData.password

            );

        });

        /* =========================================
                INVALID LOGIN
        ========================================= */

        if (!user) {

            response.writeHead(401, {

                "Content-Type": "application/json"

            });

            response.end(

                JSON.stringify({

                    success: false,

                    message: "Invalid email or password."

                })

            );

            return;

        }

        /* =========================================
                LOGIN SUCCESS
        ========================================= */

        response.writeHead(200, {

            "Content-Type": "application/json"

        });

        response.end(

            JSON.stringify({

                success: true,

                message: "Login Successful!",

                user: {

                    id: user.id,

                    fullName: user.fullName,

                    email: user.email,

                    phone: user.phone,

                    age: user.age,

                    gender: user.gender,

                    createdAt: user.createdAt

                }

            })

        );

    }

    catch (error) {

        console.error("Login Error:", error);

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







/* =====================================================
                    GET MEDICINES
===================================================== */

if (

    request.method === "GET" &&

    request.url === "/medicines"

) {

    try {

        const medicines = database.readData(

            database.MEDICINES_FILE

        );

        response.writeHead(200, {

            "Content-Type": "application/json"

        });

        response.end(

            JSON.stringify({

                success: true,

                medicines: medicines

            })

        );

    }

    catch (error) {

        console.error("Get Medicines Error:", error);

        response.writeHead(500, {

            "Content-Type": "application/json"

        });

        response.end(

            JSON.stringify({

                success: false,

                message: "Unable to load medicines."

            })

        );

    }

    return;

}







/* =====================================================
                    ADD MEDICINE
===================================================== */

if (

    request.method === "POST" &&

    request.url === "/medicines"

) {

    try {

        const medicine = await parser.parseRequestBody(

            request

        );

        const medicines = database.readData(

            database.MEDICINES_FILE

        );

        medicines.push(medicine);

        database.writeData(

            database.MEDICINES_FILE,

            medicines

        );

        response.writeHead(201, {

            "Content-Type": "application/json"

        });

        response.end(

            JSON.stringify({

                success: true,

                message: "Medicine Added Successfully.",

                medicine: medicine

            })

        );

    }

    catch (error) {

        console.error("Add Medicine Error:", error);

        response.writeHead(400, {

            "Content-Type": "application/json"

        });

        response.end(

            JSON.stringify({

                success: false,

                message: "Invalid Medicine Data."

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

