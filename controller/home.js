const path = require('path');
const viewsPath = path.join(__dirname, '../views');

const index = (req, res) => {
    const fileName = req.params.fileName;

    if (!fileName) {
        // Invalid file name, send an error response
        return res.status(400).send('Invalid file name');
    }

    const filePath = path.join(viewsPath, `${fileName}.html`);
    res.sendFile(filePath, (err) => {
        if (err) {
            // Error occurred while retrieving the file, send an error response
            console.error(err);
            return res.status(500).send('Error retrieving file');
        }
    });
};

module.exports = { index };