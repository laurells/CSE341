// This code defines a simple route in a Node.js application using the Express framework.

//Import the 'Router' module from the 'express' library using the 'require' statement and assign it to a constant variable.
const express = require('express');
const router = express.Router();

router.use('/contact', require('./contacts'))
//The 'routes' object, which represents the defined route, is exported using 'module.exports' so that it can be used in other parts of the application where this module is required.
module.exports = router;