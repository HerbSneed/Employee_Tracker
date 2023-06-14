const inquirer = require("inquirer");
const fs = require("fs");


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
]

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
  { type: "list",
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