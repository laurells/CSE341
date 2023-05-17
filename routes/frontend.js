/**
 * returns simple HTML page
 */
// Import the necessary modules
const router = require('express').Router();
const frontendController = require('../controller/home');

// Define a route for handling the home page with dynamic file name

// GET request to the '/home/:fileName' endpoint
// Calls the index function from the frontendController module
// Passes the value of the dynamic parameter ':fileName' from the request URL
router.get('/home/:fileName', frontendController.index);

// Export the router object to be used by other modules
module.exports = router;