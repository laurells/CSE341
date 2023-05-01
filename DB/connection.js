const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
// const MongoClient = require('mongodb').MongoClient;
const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.1g9t77n.mongodb.net/retryWrites=true&w=majority`;

const connectDB = async () => {
  await mongoose.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log('DB connected...!');
};

module.exports = connectDB;



// let _db;

// const initDb = (callback) => {
//   if (_db) {
//     console.log('Db is already initialized!');
//     return callback(null, _db);
//   }
//   MongoClient.connect(connectionString)
//     .then((client) => {
//       _db = client;
//       callback(null, _db);
//     })
//     .catch((err) => {
//       callback(err);
//     });
// };

// const getDb = () => {
//   if (!_db) {
//     throw Error('Db not initialized');
//   }
//   return _db;
// };

// module.exports = {
//   initDb,
//   getDb,
// };