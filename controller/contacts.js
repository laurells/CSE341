// This code exports two functions, getAllContacts and getContactById, that are used to retrieve data from a MongoDB database.

const mongodb = require('../DB/connection');
const { ObjectId } = require('mongodb');
const collection = 'contacts';
const database = 'API-database';
const faker = require('faker');
const { validateRequest } = require('../model/contactsData');
//create a function to retrieves all documents from "collection" in the database, 
//returns the document as a JSON array using the json() method of the response object.

const newContactTemplate = {
    firstName: String,
    lastName: String,
    email: String,
    favoriteColor: String,
    birthday: Date
}

const newIdTemplate = {
    id: String,
}

const getAllContacts = async (req, res) => {
    const result = await mongodb.getDb().db('API-database').collection(collection).find();
    result.toArray().then((list) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list);
    });
};
//create a function to retrieve a single document from the database collection 
//use the _id field to identify the specific document requested.
//The code validates the request parameters using the validateRequest function and newIdTemplate.
const getContactById = async (req, res) => {
    try {
        const [valid, output] = validateRequest(req.params, newIdTemplate);
        if (!valid) {
            // Invalid request params, send an error response
            res.status(500).json(`Invalid request params: ${output}`);
            console.log(req.params);
            return;
        }

        // Query the database to find a contact by _id
        const response = await mongodb.getDb().db(database)
            .collection(collection).find(
                {
                    "_id": new ObjectId(output.id)
                }
            ).toArray();

        if (response.length > 0) {
            // Contact found, set Content-Type header and send response
            req.setHeader('Content-Type', 'application/json');
            res.status(200).json(response[0]);
        } else {
            // Contact not found, send an error response
            res.status(500).json('Contact not found!');
        }
    } catch (err) {
        // Error occurred, send an error response
        res.status(500).json(err);
    }
};

//The code creates a contact object from the request body, extracting the relevant fields.
const createContact = async (req, res) => {
    try {
        // Create a contact object from the request body
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        // Insert the contact into the database
        const response = await mongodb.getDb().db('API-database').collection(collection).insertOne(contact);

        if (response.acknowledged) {
            // Contact creation successful, send a success response
            res.status(201).json(response);
        } else {
            // Contact creation failed, send an error response
            res.status(500).json(response.error || 'Some error occurred while creating the contact.');
        }
    } catch (error) {
        // Error occurred, send an error response
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteContact = async (req, res) => {
    try {
        // Validate the request params
        const [valid, output] = validateRequest(req.params, newIdTemplate);
        if (!valid) {
            // Invalid request params, send an error response
            res.status(400).json({ error: `Invalid request params: ${output}` });
            return;
        }

        // Convert contactId to ObjectId
        const contactId = new ObjectId(output.id);

        // Delete the contact from the database
        const response = await mongodb
            .getDb()
            .db('API-database')
            .collection('collection')
            .deleteOne({ _id: contactId }, true);

        if (response.deletedCount > 0) {
            // Contact deleted successfully, send a no content response
            res.status(204).send();
        } else {
            // Contact not found, send an error response
            res.status(404).json({ error: "Contact not found" });
        }
    } catch (err) {
        // Error occurred, send an error response
        console.error(err);
        res.status(500).json({ error: "An error occurred while deleting the contact" });
    }
};

const updateContact = async (req, res) => {
    try {
        // Convert userId to ObjectId
        const userId = new ObjectId(req.params.id);
    
        // Create a contact object from the request body
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        // Update the contact in the database
        const response = await mongodb
            .getDb()
            .db('API-database')
            .collection(collection)
            .replaceOne({ _id: userId }, contact);

        console.log(response);

        if (response.modifiedCount > 0) {
            // Contact updated successfully, send a no content response
            res.status(204).send();
        } else {
            // Contact update failed, send an error response
            res.status(500).json(response.error || 'Some error occurred while updating the contact.');
        }
    } catch (error) {
        // Error occurred, send an error response
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const createRandomContact = async (req, res) => {
    try {
        // Generate random contact data using faker library
        const contact = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            favoriteColor: faker.commerce.color(),
            birthday: faker.date.between('1940-01-01', '2022-01-01')
        };

        // Validate the generated contact data
        const [valid, output] = validateRequest(contact, newContactTemplate);
        if (!valid) {
            // Invalid request body, send an error response
            return res.status(400).json({ error: `Invalid request body: ${output}` });
        }

        // Insert the validated contact into the database
        const response = await mongodb.getDb().db('API-database').collection(collection).insertOne(output);
        if (response.acknowledged) {
            // Contact created successfully, send a response with the inserted document
            return res.status(201).json(response);
        } else {
            // Error occurred while creating the contact, send an error response
            return res.status(500).json({ error: response.error || 'Encountered an error while creating a contact' });
        }
    } catch (err) {
        // Error occurred, send an error response
        return res.status(500).json({ error: err.message });
    }
};
module.exports = { getAllContacts, getContactById, createContact, deleteContact, updateContact, createRandomContact };


    // try {
    //     const result = await mongodb.getDb().db('API-database').collection(collection).find(
    //         {
    //             '_id': new ObjectId(req.params.id)
    //         }
    //     );
    //     //return the result as a JSON object
    //     result.toArray().then((lists) => {
    //         if (lists.length > 0) {
    //             res.setHeader('Content-Type', 'application/json');
    //             res.status(200).json(lists[0]);
    //         //return a 404 error message if no document is found
    //         } else {
    //             res.status(404).send('Contact not found');
    //         }
    //     });
    // //return a 500 error message if there is an error in the retrieval process
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).send('Internal server error');
    // }
