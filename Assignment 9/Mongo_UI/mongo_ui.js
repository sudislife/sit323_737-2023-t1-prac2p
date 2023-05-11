// Imports
const express = require('express');

// Constants and variables
const app = express();
const res = require('express/lib/response');
let PORT;
if (typeof process.env.PORT == "undefined") {
    PORT = 3000;
} else {
    PORT = process.env.PORT;
}

// Functions
app.use(express.static('src'));

app.get('/', (req, res) => {
    // Send index.html in src folder
    res.sendFile('/src/index.html', { root: __dirname });
});

app.post('/insert', (req, res) => {
    // Insert data into MongoDB
    res.send('Inserting data into MongoDB');
});

app.post('/update', (req, res) => {
    // Update data in MongoDB
    res.send('Updating data in MongoDB');
});

app.post('/delete', (req, res) => {
    // Delete data from MongoDB
    res.send('Deleting data from MongoDB');
});

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}/`);
});