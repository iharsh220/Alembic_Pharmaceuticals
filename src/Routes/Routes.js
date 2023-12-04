const express = require('express');
const routes = express.Router();
require('dotenv').config();

const { CreateDatabase, CreateTable } = require('../Model/PostgreSQL/PostgresDB');

(async () => {
    await CreateDatabase();
    await CreateTable();
})().catch(err => {
    console.error(err);
});

const {
    GetLogin,
    PostLogin,
    AdminPage,
    UserPage,
    Userdetails,
    DeleteUser
} = require('../Controller/LoginController');

routes.get('/login', GetLogin);
routes.post('/login', PostLogin);
routes.get('/admin', AdminPage);
routes.get('/user', UserPage);
routes.get('/userdetails', Userdetails);
routes.delete('/user/:id',DeleteUser);


module.exports = routes;