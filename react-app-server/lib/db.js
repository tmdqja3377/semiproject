const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'admin',
    database: 'tserver',
    password: '1234',
    dataStrings: 'data',
});

module.exports = db;
