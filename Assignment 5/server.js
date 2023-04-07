const express = require('express');
const app = express();
const res = require('express/lib/response');

const PORT = process.env.PORT;

// Use `curl "http://localhost:3000"` to test
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

// Make a health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
});
