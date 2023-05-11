// This code defines a simple route in a Node.js application using the Express framework.

//Import the 'Router' module from the 'express' library using the 'require' statement and assign it to a constant variable.
const express = require('express');
const router = express.Router();

//the router.use() method specifies a middleware function to handle requests to the '/contact' endpoint, which is defined in a separate module './contacts.js'.
router.use('/contact', require('./contacts'));
router.use('/contact-generator', require('./contact-generator'));

//The 'routes' object, which represents the defined route, is exported using 'module.exports' so that it can be used in other parts of the application where this module is required.
module.exports = router;