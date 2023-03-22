// Creates a connection object to the MySQL database then connects to it
const mysql = require('mysql2');
const conn = mysql.createConnection({
    host: "172.20.0.9",
    user: "root",
    password: "test",
    database: "project",
});

conn.connect();

module.exports = conn;