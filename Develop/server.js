const express = require("express");
const mysql = require("mysql2");
const PORT = process.env.PORT || 3002;
const app = express();
const inquirer = require("inquirer");
const fs = require("fs");

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/api/department", (req, res) => {
  const query = "SELECT * from department";
  db.query(query, (err, departments) => {
    if (err) {
      console.error(err);
      return res.status(500).json({error: "server error"});
    }
    res.json(departments);
  });
});

app.get("/api/role", (req, res) => {
  db.query("select * from role", function (err, role) {
    res.json(role);
  });
});

app.get("/api/employee_tracker", (req, res) => {
  db.query("select * from employee_tracker", function (err, employee_tracker) {
    console.log(employee_tracker);
  });
});

// Connect to database
const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    user: "root",
    password: "uncbootcamp",
    database: "employeeTracker_db",
  },
  console.log(`Connected to the employeeTracker_db database.`)
);

const intialPrompt = [
  {
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add Department",
      "Add Role",
      "Add Employee Role",
      "Update Employee Role",
    ],
    suffix: "(Move up and down to reveal more choices)",
    name: "intialPrompt",
  },
];

const addDepartment = [
  {
    type: "input",
    message: "Enter the name of the department.",
    name: "addDepartment",
  },
];

const addRole = [
  {
    type: "input",
    message: "What's the name of the role?",
    name: "role",
  },
  {
    type: "input",
    message: "Enter the salary.",
    name: "salary",
  },
  {
    type: "input",
    message: "Enter the department",
    name: "department",
  },
];

const addEmployee = [
  {
    type: "input",
    message: "Enter the employee's first name.",
    name: "employeeFirstName",
  },
  {
    type: "input",
    message: "Enter the employee's last name.",
    name: "employeeLastName",
  },
  {
    type: "list",
    message: "What is the employee's role?",
    choices: "",
    name: "employeeRole",
  },
  {
    type: "list",
    message: "Who is the employee's manager?",
    choices: "",
    name: "employeeManager",
  },
];

const updateEmployeeRole = [
  {
    type: "list",
    message: "Which employee's role do you want to update?",
    choices: "",
    name: "employeeRoleUpdate",
  },
  {
    type: "list",
    message: "Which role do you want to assign the selected employee?",
    choices: "",
    name: "employeeAssignedRole",
  },
];

function init() {
  inquirer.prompt(intialPrompt).then((response) => {
    if (response.intialPrompt === "View All Departments") {
      db.query("select * from department", function (err, results) {
        console.table(results);
        init();
      });
    } else if (response.intialPrompt === "View All Roles") {
      db.query("select * from role", function (err, results) {
        console.table(results);
        init();
      });
    } else if (response.intialPrompt === "View All Employees") {
      db.query("select * from employee_tracker", function (err, results) {
        console.table(results);
        init();
      });
    }
  });
}



app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

init();