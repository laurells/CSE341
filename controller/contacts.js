// This code exports two functions, getAllContacts and getContactById, that are used to retrieve data from a MongoDB database.

const mongodb = require('../DB/connection');
const { ObjectId } = require('mongodb');
const collection = 'collection';
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

const getAllContacts = async (req, res, next) => {
    const result = await mongodb.getDb().db('API-database').collection(collection).find();
    result.toArray().then((list) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list);
    });
};
//create a function to retrieve a single document from the database collection 
//use the _id field to identify the specific document requested.
const getContactById = async (req, res) => {
    try {
        const [valid, output] = validateRequest(req.params, newIdTemplate);
        if (!valid) {
            res.status(500).json(`Invalid request params: ${output}`);
            console.log(req.params);
            return
        }

        const response = await mongodb.getDb().db(database)
            .collection(collection).find(
                {
                    "_id": new ObjectId(output.id)
                }
            ).toArray();
        if (response.length > 0) {
            req.setHeader('Content-Type', 'application/json');
            res.status(200).json(response[0]);
        } else {
            res.status(500).json('Contact not found!');
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const createContact = async (req, res) => {
    try {
        const [valid, output] = validateRequest(contact, newContactTemplate);
        if (!valid) {
            return res.status(400).json({ error: `Invalid request body: ${output}` });    
        }
        // Make sure birthday is not undefined before passing it to new Date()
        if (output.birthday === undefined) {
            return res.status(400).json({ error: "Invalid request body: birthday field is required" });
        }
        // Convert the birthday string to a Date object
        output.birthday = new Date(output.birthday);
        const response = await mongodb.getDb().db('API-database').collection('collection').insertOne(output);
        if (response && response.acknowledged && response.ops && response.ops.length > 0) {
            return res.status(201).json(response.ops[0]);
        } else {
            return res.status(500).json({ error: response.error || 'An error occurred while processing a new contact' });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const deleteContact = async (req, res) => {
    try {
        const [valid, output] = validateRequest(req.params, newIdTemplate);
        if (!valid) {
            res.status(400).json({ error: `Invalid request params: ${output}` });
            return;
        }

        const contactId = new ObjectId(output.id);
        const response = await mongodb
            .getDb()
            .db('API-database')
            .collection('collection')
            .deleteOne({ _id: contactId }, true);

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Contact not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while deleting the contact" });
    }
};

const updateContact = async (req, res) => {
    try {
        const [paramsValid, paramsOutput] = validateRequest(req.params, newIdTemplate);
        if (!paramsValid) {
            res.status(400).json(`Invalid request params: ${paramsOutput}`);
            console.log(req.params);
            return;
        }

        const [bodyValid, bodyOutput] = validateRequest(req.body, newContactTemplate);
        if (!bodyValid) {
            res.status(400).json(`Invalid request body: ${bodyOutput}`);
            console.log(req.body);
            return;
        }

        const contactId = new ObjectId(paramsOutput.id);
        const response = await mongodb.getDb().db("API-database").collection("collection").replaceOne({ _id: contactId }, bodyOutput);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "An error occurred while updating the contact");
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const createRandomContact = async (req, res) => {
    try {
        const contact = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            favoriteColor: faker.commerce.color(),
            birthday: faker.date.between('1940-01-01', '2022-01-01')
        };

        const [valid, output] = validateRequest(contact, newContactTemplate);
        if (!valid) {
            return res.status(400).json({ error: `Invalid request body: ${output}` });
        }

        const response = await mongodb.getDb().db('API-database').collection(collection).insertOne(output);
        if (response.acknowledged) {
            return res.status(201).json(response);
        } else {
            return res.status(500).json({ error: response.error || 'Encountered and error while creating a contact' });
        }
    } catch (err) {
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
