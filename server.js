// set up a server using the Express framework. 
//set up some middleware to handle HTTP requests and responses.
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./DB/connection');
//the server should listen for requests on a port that is either specified in an environment variable or defaults to port 3000
const port = process.env.PORT || 3000;
const app = express();

app
    .use(bodyParser.json())
    .use(express.urlencoded({ extended: true }))
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Acccept, Z-Key'
        );
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONs');
        next();
    })
    // use app.use() to register the middleware and routes for the app.
    .use('/', require('./routes'));

//initialize the MongoDB database connection and starts the server if the connection is successful. 
//if there's an error connecting to the database, it logs the error to the console.
mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Connected to DB and listening on port ${port}`)
        })
    }
});