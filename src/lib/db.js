const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "db",
    port: '3306',
    user: "remote",
    password: "test123",
    database: "project",
});

export default db;