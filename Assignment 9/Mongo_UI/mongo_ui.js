// Imports
const express = require('express');
const { MongoClient } = require('mongodb');

// Constants and variables
const app = express();
const res = require('express/lib/response');
let PORT;
if (typeof process.env.PORT == "undefined") {
    PORT = 3000;
} else {
    PORT = process.env.PORT;
}

// MongoDB connection string
const uri = 'mongodb://localhost:27017';

// MongoDB client
MongoClient.connect(uri, function (err, client) {
    if (err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
    } else {
        console.log('Connected to MongoDB');
    }
    const db = client.db('')
    client.close();
});

// Functions
app.use(express.static('src'));

app.get('/', (req, res) => {
    // Send index.html in src folder
    res.sendFile('/src/index.html', { root: __dirname });
});

// Insert
app.post('/insert', (req, res) => {
    // Insert data into MongoDB
    res.send('Inserting data into MongoDB');
});

// Update
app.post('/update', (req, res) => {
    // Update data in MongoDB
    res.send('Updating data in MongoDB');
});

// Delete
app.post('/delete', (req, res) => {
    // Delete data from MongoDB
    res.send('Deleting data from MongoDB');
});

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}/`);
});