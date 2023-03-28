const express = require('express');
const app = express();
const res = require('express/lib/response');
const winston = require('winston');

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.json(),
        winston.format.timestamp({format: 'DD-MM-YYYY HH:mm:ss'}),
    ),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.Console({ format: winston.format.simple(), colorize: true }),
        new winston.transports.File({ filename: 'combined.json' , timestamp: true }),
        new winston.transports.File({ filename: 'error.json', level: 'error' , timestamp: true }),
        new winston.transports.File({ filename: 'info.json' , level: 'info' , timestamp: true }),
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

// Use `curl "http://localhost:3000/add?n1=10&n2=20"` to test
app.get('/add', (req, res) => {
    try {
        var n1 = parseInt(req.query.n1);
        var n2 = parseInt(req.query.n2);

        if (isNaN(n1)) {
            logger.error('Invalid parameters: n1');
            throw new Error('Invalid parameters: n1');
        }

        if (isNaN(n2)) {
            logger.error('Invalid parameters: n2');
            throw new Error('Invalid parameters: n2');
        }

        if(isNaN(n1) || isNaN(n2)) {
            res.status(400).send("Invalid parameters");
        }

    } catch (err) {
        console.log(err);
    }
    
    logger.info('The sum of ' + n1 + ' and ' + n2 + ' is ' + (n1 + n2));
    res.send('The sum of ' + n1 + ' and ' + n2 + ' is ' + (n1 + n2));
});

// Use `curl "http://localhost:3000/sub?n1=10&n2=20"` to test
app.get('/sub', (req, res) => {
    try {
        var n1 = parseInt(req.query.n1);
        var n2 = parseInt(req.query.n2);

        if (isNaN(n1)) {
            logger.error('Invalid parameters: n1');
            throw new Error('Invalid parameters: n1');
        }
        if (isNaN(n2)) {
            logger.error('Invalid parameters: n2');
            throw new Error('Invalid parameters: n2');
        }

        if(isNaN(n1) || isNaN(n2)) {
            res.status(400).send("Invalid parameters");
        }

    } catch (err) {
        console.log(err);
    }

    logger.info('The difference of ' + n1 + ' and ' + n2 + ' is ' + (n1 - n2));
    res.send('The difference of ' + n1 + ' and ' + n2 + ' is ' + (n1 - n2));
});

app.get('/mul', (req, res) => {
    try {
        var n1 = parseInt(req.query.n1);
        var n2 = parseInt(req.query.n2);

        if (isNaN(n1)) {
            logger.error('Invalid parameters: n1');
            throw new Error('Invalid parameters: n1');
        }
        if (isNaN(n2)) {
            logger.error('Invalid parameters: n2');
            throw new Error('Invalid parameters: n2');
        }

        if(isNaN(n1) || isNaN(n2)) {
            res.status(400).send("Invalid parameters");
        }

    } catch (err) {
        console.log(err);
    }

    logger.info('The product of ' + n1 + ' and ' + n2 + ' is ' + (n1 * n2));
    res.send('The product of ' + n1 + ' and ' + n2 + ' is ' + (n1 * n2));
});

app.get('/div', (req, res) => {
    try {
        var n1 = parseInt(req.query.n1);
        var n2 = parseInt(req.query.n2);

        if (isNaN(n1)) {
            logger.error('Invalid parameters: n1');
            throw new Error('Invalid parameters: n1');
        }
        if (isNaN(n2)) {
            logger.error('Invalid parameters: n2');
            throw new Error('Invalid parameters: n2');
        }

        if(isNaN(n1) || isNaN(n2)) {
            res.status(400).send("Invalid parameters");
        }

    } catch (err) {
        console.log(err);
    }

    logger.log({
        level: 'info',
        message: `The quotient of ${n1} and ${n2} is ${n1/n2}`,
    });
    // logger.info('The quotient of ' + n1 + ' and ' + n2 + ' is ' + (n1 / n2));
    res.send('The quotient of ' + n1 + ' and ' + n2 + ' is ' + (n1 / n2));
});

app.get('/pow', (req, res) => {
    try {
        var n1 = parseInt(req.query.n1);
        var n2 = parseInt(req.query.n2);

        if (isNaN(n1)) {
            logger.error('Invalid parameters: n1');
            throw new Error('Invalid parameters: n1');
        }
        if (isNaN(n2)) {
            logger.error('Invalid parameters: n2');
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

    logger.info('The power of ' + n1 + ' to ' + n2 + ' is ' + Math.pow(n1, n2));
    res.send('The power of ' + n1 + ' to ' + n2 + ' is ' + Math.pow(n1, n2));
})

app.listen(6000, () => {
    console.log('Server is running on port 6000');
});
