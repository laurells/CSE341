// Import the necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./DB/connection');

// Set the port number for the server
const port = process.env.PORT || 3000;

// Create an instance of the Express application
const app = express();

// Set up middleware

// Parse JSON bodies
app.use(bodyParser.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Set headers for CORS and content type
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONs');
    next();
});

// Register routes

// Use the routes defined in the './routes' module
app.use('/', require('./routes'));

// Initialize MongoDB database connection

// Attempt to connect to the MongoDB database
mongodb.initDb((err) => {
    if (err) {
        // If there's an error connecting to the database, log the error to the console
        console.log(err);
    } else {
        // If the connection is successful, start the server and listen on the specified port
        app.listen(port, () => {
            console.log(`Connected to DB and listening on port ${port}`);
        });
    }
});