// Import the necessary modules
const express = require('express');
const router = express.Router();
const contactsController = require('../controller/contacts');

// Define routes for handling contact-related requests

// GET all contacts
router.get('/', contactsController.getAllContacts);

// GET a specific contact by ID
router.get('/:id', contactsController.getContactById);

// POST request to create a new contact
router.post('/', contactsController.createContact);

// PUT request to update a contact by ID
router.put('/:id', contactsController.updateContact);

// DELETE request to delete a contact by ID
router.delete('/:id', contactsController.deleteContact);

// Export the router object to be used by other modules
module.exports = router;