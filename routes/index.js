// This code defines a router in a Node.js application using the Express framework.

// Import the necessary modules
const express = require('express');
const router = express.Router();

// Define routes for different endpoints

// Use the './frontend' module to handle requests to the root endpoint '/'
router.use('/', require('./frontend'));

// Use the './swagger' module to handle requests to the root endpoint '/'
router.use('/', require('./swagger'));

// Use the './contacts' module to handle requests to the '/contact' endpoint
router.use('/contact', require('./contacts'));

// Use the './contact-generator' module to handle requests to the '/contact-generator' endpoint
router.use('/contact-generator', require('./contact-generator'));

// Export the router object to be used by other modules
module.exports = router;