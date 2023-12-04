const { Client } = require('pg');
require('dotenv').config();

module.exports = {

    PostgresClientConnect: async (value) => {

        return new Promise(async function (resolve, reject) {

            const client = new Client({
                host: process.env.POSTGRESS_HOST,
                user: process.env.POSTGRESS_USER,
                password: process.env.POSTGRESS_PASS,
                database: value,
                port: process.env.POSTGRESS_PORT,
            });

            resolve(client);

        });

    }

}