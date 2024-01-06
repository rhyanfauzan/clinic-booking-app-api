// db.js - Separation of Database Configuration
const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'clinic-booking-app',
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;
