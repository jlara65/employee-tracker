const mysql = require('mysql2');

require('dotenv').config();

let db_user = process.env.DB_USER;
let db_pw = process.env.DB_PASSWORD;

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: db_user,
        password: db_pw,
        database: 'employee'
    },
    console.log('Connected to the employee database')
)

module.exports = db;