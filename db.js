// db.js - Separation of Database Configuration
const mysql = require('mysql2/promise');

// dev ---
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'clinic-booking-app',
};

// prod ---
// const dbConfig = {
//   host: 'localhost',
//   user: 'u1024490_cba',
//   password: '+cbA24sukses',
//   database: 'u1024490_clinic-booking-app',
// };

const pool = mysql.createPool(dbConfig);

module.exports = pool;
