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

        console.error(

            "Get Medicines Error:",

            error

        );

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


        /* =============================================
                    ADD ID IF NEEDED
        ============================================= */

        if (!medicine.id) {

            medicine.id = Date.now();

        }


        /* =============================================
                    DEFAULT STATUS
        ============================================= */

        if (!medicine.status) {

            medicine.status = "Pending";

        }


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

        console.error(

            "Add Medicine Error:",

            error

        );

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







/* =====================================================
                    DELETE MEDICINE
===================================================== */

if (

    request.method === "DELETE" &&

    request.url.startsWith("/medicines/")

) {

    try {

        /* =============================================
                    GET MEDICINE ID
        ============================================= */

        const medicineId = request.url.split("/")[2];


        /* =============================================
                    READ MEDICINES
        ============================================= */

        const medicines = database.readData(

            database.MEDICINES_FILE

        );


        /* =============================================
                    FIND MEDICINE
        ============================================= */

        const medicineExists = medicines.some(

            function (medicine) {

                return String(medicine.id) === medicineId;

            }

        );


        if (!medicineExists) {

            response.writeHead(404, {

                "Content-Type": "application/json"

            });

            response.end(

                JSON.stringify({

                    success: false,

                    message: "Medicine not found."

                })

            );

            return;

        }


        /* =============================================
                    REMOVE MEDICINE
        ============================================= */

        const updatedMedicines = medicines.filter(

            function (medicine) {

                return String(medicine.id) !== medicineId;

            }

        );


        /* =============================================
                    SAVE DATA
        ============================================= */

        database.writeData(

            database.MEDICINES_FILE,

            updatedMedicines

        );


        /* =============================================
                    SUCCESS RESPONSE
        ============================================= */

        response.writeHead(200, {

            "Content-Type": "application/json"

        });

        response.end(

            JSON.stringify({

                success: true,

                message: "Medicine deleted successfully."

            })

        );

    }

    catch (error) {

        console.error(

            "Delete Medicine Error:",

            error

        );

        response.writeHead(500, {

            "Content-Type": "application/json"

        });

        response.end(

            JSON.stringify({

                success: false,

                message: "Unable to delete medicine."

            })

        );

    }

    return;

}





/* =====================================================
                    UPDATE MEDICINE
===================================================== */

if (

    request.method === "PUT" &&

    request.url.startsWith("/medicines/")

) {

    try {

        /* =============================================
                    GET MEDICINE ID
        ============================================= */

        const medicineId = request.url.split("/")[2];


        /* =============================================
                    READ MEDICINES
        ============================================= */

        const medicines = database.readData(

            database.MEDICINES_FILE

        );


        /* =============================================
                    FIND MEDICINE
        ============================================= */

        const medicineIndex = medicines.findIndex(

            function (medicine) {

                return String(medicine.id) === medicineId;

            }

        );


        /* =============================================
                    MEDICINE NOT FOUND
        ============================================= */

        if (medicineIndex === -1) {

            response.writeHead(404, {

                "Content-Type": "application/json"

            });

            response.end(

                JSON.stringify({

                    success: false,

                    message: "Medicine not found."

                })

            );

            return;

        }


        /* =============================================
                    GET UPDATE DATA
        ============================================= */

        const updateData = await parser.parseRequestBody(

            request

        );


        /* =============================================
                    UPDATE MEDICINE
        ============================================= */

        medicines[medicineIndex] = {

            ...medicines[medicineIndex],

            ...updateData,

            id: medicines[medicineIndex].id

        };


        /* =============================================
                    SAVE DATA
        ============================================= */

        database.writeData(

            database.MEDICINES_FILE,

            medicines

        );


        /* =============================================
                    SUCCESS
        ============================================= */

        response.writeHead(200, {

            "Content-Type": "application/json"

        });

        response.end(

            JSON.stringify({

                success: true,

                message: "Medicine updated successfully.",

                medicine: medicines[medicineIndex]

            })

        );

    }

    catch (error) {

        console.error(

            "Update Medicine Error:",

            error

        );

        response.writeHead(400, {

            "Content-Type": "application/json"

        });

        response.end(

            JSON.stringify({

                success: false,

                message: "Unable to update medicine."

            })

        );

    }

    return;

}






/* =====================================================
                    GET HISTORY
===================================================== */

if (

    request.method === "GET" &&

    request.url === "/history"

) {

    try {

        const history = database.readData(

            database.HISTORY_FILE

        );

        response.writeHead(200, {

            "Content-Type": "application/json"

        });

        response.end(

            JSON.stringify({

                success: true,

                history: history

            })

        );

    }

    catch (error) {

        console.error(

            "Get History Error:",

            error

        );

        response.writeHead(500, {

            "Content-Type": "application/json"

        });

        response.end(

            JSON.stringify({

                success: false,

                message: "Unable to load history."

            })

        );

    }

    return;

}


/* =====================================================
                    ADD HISTORY
===================================================== */

if (

    request.method === "POST" &&

    request.url === "/history"

) {

    try {

        const historyRecord =

            await parser.parseRequestBody(request);


        const history = database.readData(

            database.HISTORY_FILE

        );


        /* =============================================
                    CREATE ID
        ============================================= */

        if (!historyRecord.id) {

            historyRecord.id = Date.now();

        }


        /* =============================================
                    ADD HISTORY
        ============================================= */

        history.push(historyRecord);


        database.writeData(

            database.HISTORY_FILE,

            history

        );


        response.writeHead(201, {

            "Content-Type": "application/json"

        });

        response.end(

            JSON.stringify({

                success: true,

                message: "History record added successfully.",

                history: historyRecord

            })

        );

    }

    catch (error) {

        console.error(

            "Add History Error:",

            error

        );

        response.writeHead(400, {

            "Content-Type": "application/json"

        });

        response.end(

            JSON.stringify({

                success: false,

                message: "Invalid history data."

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

