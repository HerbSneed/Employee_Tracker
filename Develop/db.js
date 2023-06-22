const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "uncbootcamp",
  database: "employeeTracker_db",
},
  console.log('Connected to the employeeTracker_db database.')
);

module.exports = db;
