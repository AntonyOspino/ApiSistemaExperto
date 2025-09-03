const mysql = require("mysql2/promise")
require('dotenv').config(
    { path: ['.env.local', '.env']}
);
const db = mysql.createPool({
    host: process.env.HOST || "localhost",
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
    port: process.env.PORT || 3306
})

module.exports = db