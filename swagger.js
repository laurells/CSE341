// This code generates a Swagger JSON file for documenting an API.

// Import the necessary module
const swaggerAutogen = require('swagger-autogen')();

// Define the Swagger document configuration

// Set the title and description of the API
const doc = {
    info: {
        title: 'My API',
        description: 'Contacts API',
    },
    host: 'localhost:3000', // Specify the host where the API is running
    schemes: ['https'], // Specify the schemes used for the API (e.g., http, https)
};

// Specify the output file path for the generated Swagger JSON file
const outputFile = './swagger.json';

// Specify the file(s) that define the API endpoints
const endpointFile = ['./routes/index.js'];

// Generate the Swagger JSON file
swaggerAutogen(outputFile, endpointFile, doc);