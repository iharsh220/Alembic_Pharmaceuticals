const express = require('express');
const cors = require('cors');
const path = require('path');

// Create an Express application
const app = express();

//resolve Cors Error
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

const Routes = require('./src/Routes/Routes');

// Load the .env file
require('dotenv').config();


app.use('/', Routes);

const port = 4450 || process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

