const path = require('path');
const { FindQuery, GetAllDetails, DeleteUsers } = require('../Model/PostgreSQL/PostgresDB');

module.exports = {
    GetLogin: async (req, res) => {
        try {

            const loginPath = path.join(__dirname, '../public/login.html');

            res.sendFile(loginPath);

        } catch (e) {
            res.sendFile("Error File");
        }

    },
    PostLogin: async (req, res) => {
        try {

            const { username, password } = req.body;

            let userdetails = await FindQuery(req.body);

            if (username === userdetails.rows[0].username && password === userdetails.rows[0].password) {

                if (userdetails.rows[0].type === "admin") {
                    // res.send(`Welcome Admin! ${userdetails.rows[0].username}`);
                    res.redirect('http://localhost:4450/admin')
                } else {
                    // res.send(`Welcome User ${userdetails.rows[0].username}`);
                    res.redirect('http://localhost:4450/user')
                }

            } else {
                res.status(401).send('Login failed. Check your username and password.');
            }

        } catch (error) {
            res.send(error);
        }

    },
    AdminPage: async (req, res) => {
        try {

            const AdminPath = path.join(__dirname, '../public/admin.html');

            res.sendFile(AdminPath);
        } catch (error) {
            res.send(error);
        }
    },
    UserPage: async (req, res) => {
        try {

            const UserPath = path.join(__dirname, '../public/user.html');

            res.sendFile(UserPath);

        } catch (error) {
            res.send(error);
        }
    },
    Userdetails: async (req, res) => {
        try {
            let details = await GetAllDetails("usermanagement");

            res.send(details.rows);

        } catch (error) {
            res.send(error);
        }
    },
    DeleteUser: async (req, res) => {
        try {

            if (!req.params.id) throw "id not found";

            let details = await DeleteUsers(req.params);

            res.send(details);

        } catch (error) {
            res.send(error);
        }
    }
}