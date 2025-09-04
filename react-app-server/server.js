const express = require('express');
const db = require('./lib/db');
const app = express();

const port = 5000;

app.get('/', (req, res) => {
    res.send('Hello Express');
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
app.get('/hello', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

db.getConnection((err) => {
    if (err) {
        console.error('mysql 연결실패: ', err);
        return;
    }
    console.log('mysql 연결성공');
});
