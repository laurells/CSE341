const mongodb = require('../DB/connection');
const ObjectId = require('mongodb').ObjectId;
const collection = 'collection';

const getAllContacts = async (req, res, next) => {
    const result = await mongodb.getDb().db('API-database').collection(collection).find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getContactById = async (req, res, next) => {
    try {
        const result = await mongodb.getDb().db('API-database').collection(collection).find(
            {
                '_id': new ObjectId(req.params.id)
            }
        );
        result.toArray().then((lists) => {
            if (lists.length > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(lists[0]);
            } else {
                res.status(404).send('Contact not found');
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }

};

module.exports = { getAllContacts, getContactById };