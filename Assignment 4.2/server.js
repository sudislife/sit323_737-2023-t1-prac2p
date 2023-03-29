const express = require('express');
const { urlencoded } = require('body-parser');
const res = require('express/lib/response');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
// const connection = require('./config/database');
// const MongoStore = require('connect-mongo')(session);

const PORT = 3000;
const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Go to http://localhost:3000/ to test
router.get('/', (req, res, next) => {
    res.sendFile('index.html', {root: __dirname});
});

// Go to http://localhost:3000/register to test
router.get('/register', (req, res, next) => {
    res.sendFile('register.html', {root: __dirname});
});

// Go to http://localhost:3000/login to test
router.get('/login', (req, res, next) => {
    res.sendFile('login.html', {root: __dirname});
});

// Register a new user
app.post('/register', (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if (err) {
            console.log(err);

            return res.render('register');
        }

        passport.authenticate('local')(req, res, () => {
            res.redirect('/secret');
        });
    });
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
}), (req, res) => {
});


// Use `curl "http://localhost:3000/add?n1=10&n2=20"` to test
app.get('/add', (req, res) => {
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
