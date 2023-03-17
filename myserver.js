const { urlencoded } = require('body-parser');
const { json } = require('express');
const express = require('express');
const app = express();

app.use(express.static(__dirname));
app.use(express.urlencoded());

let users = [
    {id: 1, name: 'John'},
    {id: 2, name: 'Jane'},
    {id: 3, name: 'Bob'},
]

app.get('/', (req, res) => {
    res.send("Welcome to Cheeky's server!!!");
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    var userID = req.params.id;
    console.log(userID);
    var userFound = false;

    for (let i = 0; i < 3; i++) {
        if (parseInt(users[i].id) == parseInt(userID)) {
            res.json(users[i].name);
            userFound = true;
        }
    }

    if (userFound == false) {
        res.send('Error');
    }
});

var messages = [
    // {name: '', message: ''},
    {name: 'Tim', message: 'Hi'},
    {name: 'Jane', message: 'Hello'},
]

app.get('/messages', (req, res) => {
    res.send(messages);
})

// app.post('/users', (req, res) => {
    
// });

var server = app.listen(3000, () => { 
  console.log('Server is listening on port', server.address().port); 
}); 
