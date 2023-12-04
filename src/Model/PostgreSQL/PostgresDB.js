const postgres = require("./PostgresClient");
require('dotenv').config();
const PostgresClient = require("./PostgresClient");

module.exports = {

    CreateDatabase: async () => {
        try {

            var client = await postgres.PostgresClientConnect('');

            try {

                await client.connect();
                await client.query(`CREATE DATABASE ${process.env.DB}`);
                console.log(true);

            } catch (error) {

                console.log(`${process.env.DB} Database already exists`);

            } finally {

                await client.end();         // closes connection

            }

        } catch (e) {

            console.log(e);

        }

    },
    CreateTable: async () => {
        try {

            var db = {};

            var client = await postgres.PostgresClientConnect(process.env.DB);

            await client.connect();


            db.query = `CREATE TABLE IF NOT EXISTS "${process.env.DB}" (
                                            "id" SERIAL,
                                            "username" VARCHAR(50) NOT NULL,
                                            "password" VARCHAR(100) NOT NULL,
                                            "type" VARCHAR(100) NOT NULL,
                                            PRIMARY KEY ("id")
                                        );`

            try {

                await client.query(db.query);

                console.log("tables created")

            } catch (error) {

                console.error("tableerror", error);

                // console.log(false);

            } finally {

                await client.end();         // closes connection

            }

        } catch (e) {
            console.log(e);
        }
    },
    insertQuery: async (data, table) => {

        var client = await postgres.PostgresClientConnect(process.env.DB);

        try {

            await client.connect();

            await client.query(`INSERT INTO "${table}" ("username", "password", "type")  
            VALUES ($1, $2, $3)`, [data.username, data.password, data.type]);

            console.log(true);

        } catch (error) {

            console.log("falsei", false);

        } finally {

            await client.end();

        }

    },
    FindQuery: async (body) => {

        return new Promise(async function (resolve, reject) {

            var client = await postgres.PostgresClientConnect(process.env.DB);

            try {

                await client.connect();
                var data = await client.query(`SELECT * FROM "usermanagement" WHERE username='${body.username}'`);

                resolve(data);


            } catch (error) {

                console.log(error);

            } finally {

                await client.end();

            }
        });

    },
    FindUserId: async (userid, table) => {

        return new Promise(async function (resolve, reject) {

            var client = await postgres.PostgresClientConnect(process.env.DB);

            try {

                // console.log("userid" , userid);

                await client.connect();
                var data = await client.query(`SELECT * FROM ${table} WHERE userid='${userid}'`);

                resolve(data);


            } catch (error) {

                console.log(error);

            } finally {

                await client.end();

            }
        });

    },
    SetTask: async (data, table) => {

        var client = await postgres.PostgresClientConnect(process.env.DB);

        try {

            await client.connect();

            console.log("set_task_user", data);

            // data.user =  [
            //     { label: 'andrew', value: 'andrew' },
            //     { label: 'mark1', value: 'mark' },
            //     { label: 'mark2', value: 'mark2' },
            //     { label: 'mark3', value: 'mark3' },
            //     { label: 'mark4', value: 'mark4' },
            //     { label: 'mark5', value: 'mark5' },
            //     { label: 'mark6', value: 'mark6' },
            //     { label: 'mark7', value: 'mark7' },
            //     { label: 'mark8', value: 'mark8' },
            //     { label: 'mark9', value: 'mark9' }
            //   ]

            await client.query(`INSERT INTO "${table}" ("appid", "taskid" , "Measures" , "Users")  
            VALUES ($1, $2, $3, $4)`, [data.appid, data.taskid, data.measures, data.user]);

            console.log(true);

        } catch (error) {

            console.log("false in settask", false);

        } finally {

            await client.end();

        }

    },
    GetAllDetails: async (table) => {

        return new Promise(async function (resolve, reject) {

            var client = await postgres.PostgresClientConnect(process.env.DB);

            try {

                await client.connect();
                var data = await client.query(`SELECT * FROM ${table}`);

                resolve(data);

            } catch (error) {

                console.log("false", false);
                resolve(error);

            } finally {

                await client.end();

            }

        });

    },
    SetConfig: async (body, table) => {

        return new Promise(async function (resolve, reject) {

            var client = await postgres.PostgresClientConnect(process.env.DB);

            try {

                await client.connect();
                await client.query(`INSERT INTO "${table}" ("Hostname", "UserId", "Userdirectory", "BotID", "BotPassword")  
                VALUES ($1, $2, $3, $4, $5)`, [body.Hostname, body.UserId, body.Userdirectory, body.BotID, body.BotPassword]);

                var data = JSON.stringify(body);

                // await client.query(`INSERT INTO "logteams" ("Actiontype", "Actionsubtype", "body", "ActionBy")
                // VALUES ('Configuration', 'Add Configuration', '${data}', '${body.Mobileno}')`);

                resolve({ message: "Thanks! You can procced", status: 200, condition: true });

            } catch (error) {

                console.error(error.stack);

                resolve({ message: "Dublicate key", condition: false });

            } finally {

                await client.end();

            }

        });

    },
    DeleteConfig: async (table) => {

        return new Promise(async function (resolve, reject) {

            var client = await postgres.PostgresClientConnect(process.env.DB);

            try {

                await client.connect();
                await client.query(`DELETE FROM ${table}`);

                // await client.query(`INSERT INTO "logteams" ("Actiontype", "Actionsubtype", "body", "ActionBy")
                // VALUES ('Configuration', 'Delete Configuration', 'Configuration Deleted', 'Admin')`);

                resolve({ message: "Deleted", status: 200, condition: true });

            } catch (error) {

                // console.error(error.stack);
                resolve({ condition: false });

            } finally {

                await client.end();

            }

        });

    },
    SetUsers: async (users, table) => {

        return new Promise(async function (resolve, reject) {

            var client = await postgres.PostgresClientConnect(process.env.DB);

            try {

                await client.connect();

                await client.query(`INSERT INTO "${table}" ("id" , "teamsid", "userid" , "userdirectory" ,"username" , "qlikstatus" , "jobstatus")  
                VALUES ($1, $2, $3, $4, $5, $6, $7)`, [users.id, users.teamsid, users.userid, users.userdirectory, users.username, users.qlikstatus, users.jobstatus]);

                var data = JSON.stringify(users);

                // await client.query(`INSERT INTO "logteams" ("Actiontype", "Actionsubtype", "body", "ActionBy")
                // VALUES ('useraddition', 'user added', '${data}', '${users.phoneno}')`);

                resolve({ message: "User added successfully", status: 200, condition: true });

            } catch (error) {

                // client.connect();

                // client.query (`INSERT INTO "logteams" ("Actiontype", "Actionsubtype", "body", "ActionBy")
                // VALUES ('useraddition', 'user addition', 'User adding Failed!', '${users.phoneno}')`);

                resolve({ message: "Conflict", status: 409, condition: false });

                console.log(error);


            } finally {

                await client.end()

            }

        });

    },
    GetApps: async (table) => {

        return new Promise(async function (resolve, reject) {

            var client = await postgres.PostgresClientConnect(process.env.DB);

            try {

                await client.connect();
                var data = await client.query(`SELECT * FROM ${table}`);


                // resolve(data);
                resolve({ message: "ok", status: 200, condition: true, data: data });

            } catch (error) {

                console.log("false", false);
                resolve(error);

            } finally {

                await client.end();

            }

        });

    },
    SetApps: async (apps, table) => {

        return new Promise(async function (resolve, reject) {
            // console.log("apps", apps);
            var client = await postgres.PostgresClientConnect(process.env.DB);

            try {

                await client.connect();

                await client.query(`INSERT INTO "${table}" ("stream" , "id" , "name")  

                VALUES ($1 , $2 , $3)`, [apps.stream, apps.id, apps.name]);

                resolve({ message: "ok", status: 200, condition: true });

            } catch (e) {
                resolve({ condition: false })
            } finally {
                await client.end();
            }

        });

    },
    DeleteApps: async (table) => {

        return new Promise(async function (resolve, reject) {

            var client = await postgres.PostgresClientConnect(process.env.DB);

            try {

                await client.connect();

                await client.query(`DELETE FROM ${table}`);

                resolve({ message: "Deleted", status: 200, condition: true });

            } catch (e) {
                resolve({ condition: false })
            } finally {
                await client.end();
            }

        });

    },
    UpdateUsers: async (users, table) => {

        return new Promise(async function (resolve, reject) {

            var client = await postgres.PostgresClientConnect(process.env.DB);

            // console.log("data", users);

            var query = `UPDATE ${table}
            SET userid='${users.userid}', teamsid='${users.teamsid}', userdirectory='${users.userdirectory}', username='${users.username}', qlikstatus='${users.qlikstatus}', jobstatus='${users.jobstatus}'  
            WHERE id='${users.id}';`;

            var data = JSON.stringify(users);

            try {
                await client.connect();

                await client.query(query);

                // await client.query(`INSERT INTO "logteams" ("Actiontype", "Actionsubtype", "body", "ActionBy")
                // VALUES ('userupdate', 'user updated', '${data}', '${users.phoneno}')`);

                resolve({ message: "ok", status: 200, condition: true });

            } catch (e) {

                // client.connect();

                // client.query(`INSERT INTO "logteams" ("Actiontype", "Actionsubtype", "body", "ActionBy")
                // VALUES ('userupdate', 'user updating', 'User updating Failed!', '${users.phoneno}')`);

                resolve({ condition: false })

            } finally {

                await client.end();

            }

        })
    },
    DeleteUsers: async (users) => {

        return new Promise(async function (resolve, reject) {
            var client = await postgres.PostgresClientConnect(process.env.DB);

            try {

                await client.connect();
                console.log(users)
                await client.query(`DELETE FROM "usermanagement" WHERE id='${users.id}';`);

                resolve({ message: "Deleted", status: 200, condition: true });

            } catch (e) {

                console.log(e);

                resolve({ condition: false })

            } finally {
                await client.end();
            }
        })
    },
    Find_Nmber: async (body) => {

        return new Promise(async function (resolve, reject) {

            var client = await postgres.PostgresClientConnect(process.env.DB);

            try {

                await client.connect();
                var data = await client.query(`SELECT * FROM ${body.Table} WHERE phoneno='${body.Number}'`);

                resolve({ message: "ok", status: 200, condition: true, data: data });


            } catch (error) {

                console.log(error);
                resolve({ message: "Not Found", status: 404, condition: false });

            } finally {

                await client.end();

            }
        });

    },
    Store_App: async (apps, table) => {

        return new Promise(async function (resolve, reject) {

            var client = await postgres.PostgresClientConnect(process.env.DB);

            try {

                await client.connect();

                var data = await client.query(`SELECT * FROM ${table} WHERE mobileno='${apps.number}'`);

                if (data.rows.length != 0) {

                    var query = `UPDATE ${table}
                    SET id ='${apps.id}' ,title = '${apps.title}', userid='${apps.userid}', userdirectory='${apps.userdirectory}', hostname='${apps.host}'
                    WHERE mobileno='${apps.number}'`;

                    await client.query(query);

                    resolve({ message: "ok", status: 200, condition: true });

                } else {

                    await client.query(`INSERT INTO "${table}" ("mobileno" , "id" , "title", "userid", "userdirectory" , "hostname") VALUES ( $1, $2, $3, $4, $5, $6 )`, [apps.number, apps.id, apps.title, apps.userid, apps.userdirectory, apps.host]);

                    resolve({ message: "ok", status: 200, condition: true });

                }
                resolve(data);


            } catch (error) {
                console.log("error", error);
                resolve(false);

            } finally {

                await client.end();

            }
        });

    },
    UserWiseFind: async (Userdetail, table) => {

        return new Promise(async function (resolve, reject) {

            var client = await postgres.PostgresClientConnect(process.env.DB);

            try {

                await client.connect();

                var data = await client.query(`SELECT * FROM ${table} WHERE mobileno='${Userdetail.number}'`);

                resolve(data);


            } catch (error) {
                console.log(error);
                resolve(false);

            } finally {

                await client.end();

            }
        });

    },
    DeleteApps: async (Userdetail, table) => {

        return new Promise(async function (resolve, reject) {

            var client = await postgres.PostgresClientConnect(process.env.DB);

            try {

                await client.connect();

                var data = await client.query(`DELETE FROM ${table} WHERE mobileno='${Userdetail.number}'`);

                resolve(data);


            } catch (error) {
                console.log(error);
                resolve(false);

            } finally {

                await client.end();

            }
        });

    },
    insertExecutions: async (data, table) => {

        var client = await postgres.PostgresClientConnect(process.env.DB);

        try {

            await client.connect();

            // await client.query(`INSERT INTO "${table}" ("nextexecution" , "operationalid")  
            // VALUES ($1, $2)`, [data.nextExecution, data.operationalID]);

            await client.query(`INSERT INTO "${table}"
                (nextexecution, operationalid)
                SELECT ${data.nextExecution},${data.operationalID}
                WHERE
                    NOT EXISTS (
                        SELECT operationalid FROM "${table}" WHERE operationalid = '${data.operationalID}');
                `)

            console.log(true);

        } catch (error) {
            console.log(error);
            console.log("falsei", false);

        } finally {

            await client.end();

        }

    },
    SetJobs: async (users, table) => {

        console.log("D", users);

        return new Promise(async function (resolve, reject) {

            var client = await postgres.PostgresClientConnect(process.env.DB);

            var query = `UPDATE ${table} 
            SET jobstatus='${users.jobstatus}' WHERE id='${users.id}';`;

            try {
                await client.connect();

                await client.query(query);

                var data = JSON.stringify(users);

                // await client.query(`INSERT INTO "logteams" ("Actiontype", "Actionsubtype", "body", "ActionBy")
                // VALUES ('BotStatus', 'Bot status updated', '${data}', '${users.id}')`);

                resolve({ message: "ok", status: 200, condition: true });

            } catch (e) {
                // console.log(e);

                resolve({ condition: false })

            } finally {

                await client.end();

            }

        });
    },
    database: async (data, subtype, Userdetail) => {

        return new Promise(async function (resolve, reject) {

            var client = await postgres.PostgresClientConnect(process.env.DB);

            try {

                await client.connect();

                var body = JSON.stringify(data);

                // console.log("b" , body);

                // await client.query(`INSERT INTO "logteams" ("Actiontype", "Actionsubtype", "body", "ActionBy")
                // VALUES ('Chatbot', '${subtype}' , '${body}', '${Userdetail.number}')`);

                resolve({ condition: true });

            } catch (error) {

                resolve({ condition: false });


            } finally {

                await client.end()

            }

        });
    },
    setadminusers: async (data, table) => {

        return new Promise(async function (resolve, reject) {

            var client = await postgres.PostgresClientConnect(process.env.DB);

            try {

                await client.connect();

                // await client.query(`INSERT INTO "${table}" ("id" , "username" , "password" , "type") 
                // VALUES ($1 , $2 , $3 , $4)` , [data.id , data.username , data.password , data.type])

                await client.query(`INSERT INTO "${table}" ("username" , "password" , "type") 
                VALUES ($1 , $2 , $3)` , [data.username, data.password, data.type])

                resolve({ message: "User added successfully", status: 200, condition: true });

            } catch (e) {

                resolve({ message: "Conflict", status: 409, condition: false });

                // console.log(e);

            } finally {

                await client.end();

            }

        });
    },
    deleteadminusers: async (data, table) => {

        return new Promise(async function (resolve, reject) {

            var client = await postgres.PostgresClientConnect(process.env.DB);

            try {

                await client.connect();

                await client.query(`DELETE FROM "${table}" where id = ${data.id}`);

                resolve({ message: "User deleted successfully", status: 200, condition: true });

            } catch (e) {

                console.log(e);

                resolve({ message: "Conflict", status: 409, condition: false });

            } finally {

                await client.end();
            }

        })
    },
    updateadminusers: async (data, table) => {

        return new Promise(async function (resolve, reject) {

            var client = await PostgresClient.PostgresClientConnect(process.env.DB);

            var query = `UPDATE "${table}" 
            SET username='${data.username}', password='${data.password}',type='${data.type}' 
            WHERE id = '${data.id}';`

            try {

                await client.connect();

                await client.query(query);

                resolve({ message: "user updated", status: 200, condition: true });

            } catch (e) {

                console.log("error", e);

                resolve({ condition: false });

            } finally {

                await client.end();

            }
        })

    },
    deletetask: async (id, table) => {

        return new Promise(async function (resolve, reject) {

            var client = await postgres.PostgresClientConnect(process.env.DB);

            try {

                console.log("Delete Task", id);

                await client.connect();

                var data = await client.query(`DELETE FROM ${table} WHERE id='${id.id}'`);

                resolve(data);

            } catch (error) {
                console.log(error);
                resolve(false);

            } finally {

                await client.end();

            }
        });
    }
}