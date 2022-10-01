const mysql = require('mysql2');
const util = require('util');

require('dotenv').config();

let db_user = process.env.DB_USER;
let db_pw = process.env.DB_PASSWORD;

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: db_user,
        password: db_pw,
        database: 'employee_db'
    },
    console.log('Connected to the employee_db database')
)
db.query = util.promisify(db.query);

module.exports = db;