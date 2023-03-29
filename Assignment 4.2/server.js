const express = require('express');
const res = require('express/lib/response');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const path = require('path');
const router = require('express').Router();
const utils = require('./lib/utils');
const mongoose = require('mongoose');
require('./model/user');
const connection = require('./config/database');
const User = mongoose.model('User', connection.userSchema);
require('./config/passport');

const PORT = 3000;
const app = express();

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

// Go to http://localhost:3000/ to test
router.get('/', (req, res, next) => {
    res.sendFile('index.html', {root: __dirname});
});

// Go to http://localhost:3000/register to test
router.get('/register', (req, res) => {
    res.sendFile('register.html', {root: __dirname});
});

// Go to http://localhost:3000/login to test
router.get('/login', (req, res) => {
    res.sendFile('login.html', {root: __dirname});
});

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!"});
});

// Validate an existing user and issue a JWT
router.post('/login', function(req, res, next){
    console.log('User attempted to log in: ' + req.body.username)
    User.findOne({ username: req.body.username })
        .then((user) => {

            if (!user) {
                return res.status(401).json({ success: false, msg: "could not find user" });
            }
            
            // Function defined at bottom of app.js
            const isValid = utils.validPassword(req.body.password, user.hash, user.salt);
            
            if (isValid) {

                const tokenObject = utils.issueJWT(user);

                res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });

            } else {

                res.status(401).json({ success: false, msg: "you entered the wrong password" });

            }

        })
        .catch((err) => {
            next(err);
        });
});

// Register a new user
router.post('/register', function(req, res, next){
    const saltHash = utils.genPassword(req.body.password);
    
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: req.body.username,
        hash: hash,
        salt: salt
    });

    try {
    
        newUser.save()
            .then((user) => {
                res.sendFile('success.html', {root: __dirname});
            });

    } catch (err) {
        
        res.json({ success: false, msg: err });
    
    }

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
