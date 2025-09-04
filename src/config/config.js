// En tu archivo de configuración de Express (db.js)
const mysql = require("mysql2/promise");
require('dotenv').config({ path: ['.env.local', '.env'] });

// Usa el objeto global para almacenar la única instancia del pool
if (global.dbPool) {
    console.log("Usando la instancia de pool existente.");
    module.exports = global.dbPool;
} else {
    console.log("Creando una nueva instancia de pool.");
    const db = mysql.createPool({
        host: process.env.HOST || "localhost",
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 50,
        port: process.env.PORT || 3306
    });

    global.dbPool = db;
    module.exports = db;
}