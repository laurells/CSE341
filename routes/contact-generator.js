/**
 * returns JSON responses from database
 */
const express = require('express');
const router = express.Router();
const contactsController = require('../controller/contacts');

//post
router.post('/', contactsController.createRandomContact);

module.exports = router;