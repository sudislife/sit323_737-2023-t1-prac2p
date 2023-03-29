const express = require('express');
const { urlencoded } = require('body-parser');
const app = express();
const res = require('express/lib/response');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bodyParser = require('body-parser');

const PORT = 3000;

app.use(passport.initialize());
app.use(bodyParser.json());

// Go to http://localhost:3000/ to test
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
});

// Go to http://localhost:3000/register to test
app.get('/register', (req, res) => {
    res.sendFile('register.html', {root: __dirname});
});

// Go to http://localhost:3000/login to test
app.get('/login', (req, res) => {
    res.sendFile('login.html', {root: __dirname});
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
    console.log(`Server is running on port ${PORT}`);
});
