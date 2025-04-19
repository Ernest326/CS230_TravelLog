const dotenv = require('dotenv');
const mysql = require('mysql');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

module.exports = pool;