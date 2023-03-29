const mongoose = require('mongoose');

require('dotenv').config();

/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 * 
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 * DB_STRING_PROD=<your production database string>
 */ 

const conn = process.env.DB_STRING;

mongoose.connect(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Database connected');
});

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    hash: String,
    salt: String
});