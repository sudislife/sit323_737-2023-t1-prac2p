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

// Logout a user
router.get('/logout', (req, res) => {

    res.redirect('/');
});

// Use `curl "http://localhost:3000/add?n1=10&n2=20"` to test
router.get('/add', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    try {
        var n1 = parseInt(req.query.n1);
        var n2 = parseInt(req.query.n2);

        if (isNaN(n1)) {
            throw new Error('Invalid parameters: n2');
        }

        if (isNaN(n2)) {
            throw new Error('Invalid parameters: n2');
        }

        if(isNaN(n1) || isNaN(n2)) {
            res.status(400).send("Invalid parameters");
        }

    } catch (err) {
        console.log(err);
    }
    
    res.send('The sum of ' + n1 + ' and ' + n2 + ' is ' + (n1 + n2));
});

// Use `curl "http://localhost:3000/sub?n1=10&n2=20"` to test
app.get('/sub', (req, res) => {
    try {
        var n1 = parseInt(req.query.n1);
        var n2 = parseInt(req.query.n2);

        if (isNaN(n1)) {
            throw new Error('Invalid parameters: n1');
        }
        if (isNaN(n2)) {
            throw new Error('Invalid parameters: n2');
        }

        if(isNaN(n1) || isNaN(n2)) {
            res.status(400).send("Invalid parameters");
        }

    } catch (err) {
        console.log(err);
    }

    res.send('The difference of ' + n1 + ' and ' + n2 + ' is ' + (n1 - n2));
});

// Use `curl "http://localhost:3000/mul?n1=10&n2=20"` to test
app.get('/mul', (req, res) => {
    try {
        var n1 = parseInt(req.query.n1);
        var n2 = parseInt(req.query.n2);

        if (isNaN(n1)) {
            throw new Error('Invalid parameters: n1');
        }
        if (isNaN(n2)) {
            throw new Error('Invalid parameters: n2');
        }

        if(isNaN(n1) || isNaN(n2)) {
            res.status(400).send("Invalid parameters");
        }

    } catch (err) {
        console.log(err);
    }

    res.send('The product of ' + n1 + ' and ' + n2 + ' is ' + (n1 * n2));
});

// Use `curl "http://localhost:3000/div?n1=10&n2=2"` to test
app.get('/div', (req, res) => {
    try {
        var n1 = parseInt(req.query.n1);
        var n2 = parseInt(req.query.n2);

        if (isNaN(n1)) {
            throw new Error('Invalid parameters: n1');
        }
        if (isNaN(n2)) {
            throw new Error('Invalid parameters: n2');
        }

        if(isNaN(n1) || isNaN(n2)) {
            res.status(400).send("Invalid parameters");
        }

    } catch (err) {
        console.log(err);
    }

    res.send('The quotient of ' + n1 + ' and ' + n2 + ' is ' + (n1 / n2));
});

// Use `curl "http://localhost:3000/pow?n1=10&n2=2"` to test
app.get('/pow', (req, res) => {
    try {
        var n1 = parseInt(req.query.n1);
        var n2 = parseInt(req.query.n2);

        if (isNaN(n1)) {
            throw new Error('Invalid parameters: n1');
        }
        if (isNaN(n2)) {
            throw new Error('Invalid parameters: n2');
        }

        if(isNaN(n1) || isNaN(n2)) {
            res.status(400).send("Invalid parameters");
        }

        if (n1 < 0 && n2 % 1 != 0) {
            throw new Error('Invalid parameters: n1 and n2');
        }

    } catch (err) {
        console.log(err);
    }

    res.send('The power of ' + n1 + ' to ' + n2 + ' is ' + Math.pow(n1, n2));
});

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
