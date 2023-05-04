// This code exports two functions, getAllContacts and getContactById, that are used to retrieve data from a MongoDB database.

const mongodb = require('../DB/connection');
const ObjectId = require('mongodb').ObjectId;
const collection = 'collection';
//create a function to retrieves all documents from "collection" in the database, 
//returns the document as a JSON array using the json() method of the response object.
const getAllContacts = async (req, res, next) => {
    const result = await mongodb.getDb().db('API-database').collection(collection).find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};
//create a function to retrieve a single document from the database collection 
//use the _id field to identify the specific document requested.
const getContactById = async (req, res, next) => {
    try {
        const result = await mongodb.getDb().db('API-database').collection(collection).find(
            {
                '_id': new ObjectId(req.params.id)
            }
        );
        //return the result as a JSON object
        result.toArray().then((lists) => {
            if (lists.length > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(lists[0]);
            //return a 404 error message if no document is found
            } else {
                res.status(404).send('Contact not found');
            }
        });
    //return a 500 error message if there is an error in the retrieval process
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }

};

module.exports = { getAllContacts, getContactById };