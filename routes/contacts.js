//code imports a module called 'contactsController' which contains functions that handle the logic for the '/contacts' route.
const express = require('express');
const router = express.Router();
const contactsController = require('../controller/contacts');

// create a route that handles GET requests to the '/' endpoint and calls the getAllContacts function from the contactsController module.
router.get('/', contactsController.getAllContacts);
// create another route that handles GET requests to the '/:id' endpoint and calls the getContactById function from the contactsController module, passing in the id parameter from the request URL.
router.get('/:id', contactsController.getContactById);
//post
router.post('/', contactsController.createContact);
//put
router.put('/:id', contactsController.updateContact);
//delete
router.delete('/:id', contactsController.deleteContact);

//export the router object using module.exports so that it can be used in other parts of the application where this module is required. 
module.exports = router;