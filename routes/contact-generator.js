// /**
//  * returns JSON responses from database
//  */
const express = require('express');
const router = express.Router();
const contactsController = require('../controller/contacts');

// Define a router for handling contact-related routes

// Handle the POST request to create a random contact
router.post('/', contactsController.createRandomContact);

// Export the router to be used by other modules
module.exports = router;