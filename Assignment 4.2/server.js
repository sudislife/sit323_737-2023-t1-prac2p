const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
require('dotenv').config();

const PORT = 3000;
const app = express();

require('./config/database');
require('./model/user');
require('./config/passport')(passport);

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
router = express.Router();
app.use(require('./routes/users'));

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
