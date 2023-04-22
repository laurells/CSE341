// Import the Express library using the 'require' statement and assign it to a constant variable.
const express = require('express');
//Create an Express application by invoking the 'express()' function and assign it to a constant variable.
const app = express();
//Set the port number for the server to listen on. Use the value of the 'PORT' environment variable if available, otherwise use port 3000 as a default.
const port = process.env.PORT || 3000;
// Registers a middleware function using 'app.use()' that handles all incoming HTTP requests with the '/' (root) path and delegates the handling of these requests to a separate file or module located at './routes'.
app.use('/', require('./routes'))
//use the 'app.listen()' function to listen for incoming requests on the specified port when the server is started. When a request is received, it will trigger the callback function that logs a message to the console indicating which port the server is running on.
app.listen(port, () => {
    console.log(`Running on port ${port}`)
})