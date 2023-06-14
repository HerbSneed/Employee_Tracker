const express = require("express");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'uncbootcamp',
    database: 'employeeTracker_db',
  },
  console.log(`Connected to the employeeTracker_db database.`)
);

db.query('select * from department', function (err, results) {
  console.log(results);
});

db.query("select * from role", function (err, results) {
  console.log(results);
});

db.query("select * from employee_tracker", function (err, results) {
  console.log(results);
});

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});