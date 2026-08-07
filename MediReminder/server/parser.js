"use strict";

/* =====================================================
                    PARSE REQUEST BODY
===================================================== */

function parseRequestBody(request) {

    return new Promise(function (resolve, reject) {

        let body = "";

        request.on("data", function (chunk) {

            body += chunk;

        });

        request.on("end", function () {

            if (!body) {

                resolve({});

                return;

            }

            try {

                const data = JSON.parse(body);

                resolve(data);

            }

            catch (error) {

                reject(error);

            }

        });

    });

}

/* =====================================================
                    EXPORT MODULE
===================================================== */

module.exports = {

    parseRequestBody

};

