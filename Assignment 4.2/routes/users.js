const mongoose = require('mongoose');
const router = require('express').Router();   
const User = mongoose.model('User');
const passport = require('passport');
const utils = require('../lib/utils');

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!"});
});

// Validate an existing user and issue a JWT
router.post('/login', function(req, res, next){
    User.findOne({ username: req.body.username })
        .then((user) => {

            if (!user) {
                return res.status(401).json({ success: false, msg: "could not find user" });
            }
            
            // Function defined at bottom of app.js
            const isValid = utils.validPassword(req.body.password, user.hash, user.salt);
            
            if (isValid) {

                const tokenObject = utils.issueJWT(user);
                console.log('User token: ' + tokenObject)

                res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
                // res.sendFile('success.html', {root: __dirname});

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
                res.sendFile('login.html', {root: __dirname});
            });

    } catch (err) {
        
        res.json({ success: false, msg: err });
    
    }

});

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

// Logout a user
router.get('/logout', (req, res) => {

    res.redirect('/');
});

module.exports = router;