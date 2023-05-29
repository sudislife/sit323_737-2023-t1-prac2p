// Imports
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

// Constants and variables
const app = express();
const res = require('express/lib/response');
let PORT;
if (typeof process.env.PORT == "undefined") {
    PORT = 3000;
} else {
    PORT = parseInt(process.env.PORT);
}

// MongoDB connection string
const uri = 'mongodb://mongo-svc:27017/?directConnection=true';

// Database name and collection name
const database = 'nameage';
const collection = 'mycollection';

// Functions
app.use(express.static('src'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB client
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
async function connect() {
    try {
        // Connect the client to the server
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
    }
}

// Insert data into MongoDB
async function insertOne(name, age) {
    try {
        // Connect the client to the server
        await client.connect();
        
        // Get the database and collection
        const database = client.db('nameage');
        const collection = database.collection('mycollection');

        // Insert a json document
        await collection.insertOne({ name: name, age: age });
    } catch (error) {
        console.log(error);
    }
}

async function deleteOne(name) {
    try {
        // Connect the client to the server
        await client.connect();

        // Get the database and collection
        const database = client.db('nameage');
        const collection = database.collection('mycollection');

        // Delete a json document
        await collection.deleteOne({ name: name });
    } catch {
        console.log(error);
    }
}

async function updateOne(name, name2, age) {
    try{
        // Connect the client to the server
        await client.connect();

        // Get the database and collection
        const database = client.db('nameage');
        const collection = database.collection('mycollection');

        // Update a json document
        await collection.updateOne({ name: name }, { $set: { name: name2, age: age } });
    } catch {
        console.log(error);
    }
}

// Read data from MongoDB
async function read() {
    let result;
    try {
        // Connect the client to the server
        await client.connect();
        
        // Get the database and collection
        const database = client.db('nameage');
        const collection = database.collection('mycollection');

        // Find all documents
        result = await collection.find().toArray();
    } catch (error) {
        console.error(error);
    }
    console.log(result);
    return result;
}

app.get('/', (req, res) => {
    // Send index.html in src folder
    res.sendFile('/src/index.html', { root: __dirname });
});

app.get('/insert', (req, res) => {
    // Send insert.html in src folder
    res.sendFile('/src/insert.html', { root: __dirname });
});

app.get('/delete', (req, res) => {
    // Send delete.html in src folder
    res.sendFile('/src/delete.html', { root: __dirname });
});

app.get('/update', (req, res) => {
    // Send update.html in src folder
    res.sendFile('/src/update.html', { root: __dirname });
});

app.get('/read', (req, res) => {
    // Send read.html in src folder
    res.sendFile('/src/read.html', { root: __dirname });
});

// Insert
app.post('/insert', async (req, res) => {
    const name = req.body.name;
    const age = parseInt(req.body.age);
    
    insertOne(name, age);

    console.log('Inserted data name: ' + name + ' age: ' + age);
    res.sendFile('/src/insert.html', { root: __dirname });
});

app.post('/delete', async (req, res) => {
    const name = req.body.name;

    deleteOne(name);

    console.log('Deleted data name: ' + name);
    res.sendFile('/src/delete.html', { root: __dirname });

});

app.post('/read', (req, res) => {
    const result = read();
    res.json(result);
});

// Update
app.post('/update', (req, res) => {
    const name = req.body.name;
    const name2 = req.body.name2;
    const age = parseInt(req.body.age);

    updateOne(name, name2, age);

    console.log('Updated data name: ' + name + ' to name: ' + name2 + ' age: ' + age);
    res.sendFile('/src/update.html', { root: __dirname });
});

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}/`);
    connect();
});