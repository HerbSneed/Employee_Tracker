const inquirer = require("inquirer");
const db = require("../db");

const initialPrompt = [
  {
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add Department",
      "Add Role",
      "Add an Employee",
      "Update Employee Role",
    ],
    name: "initialPrompt",
  },
];

function init() {
  inquirer.prompt(initialPrompt).then((response) => {
    if (response.initialPrompt === "View All Departments") {
      db.query("select * from department", function (err, results) {
        console.table(results);
        init();
      });
    } else if (response.initialPrompt === "View All Roles") {
      db.query("select * from role", function (err, results) {
        console.table(results);
        init();
      });
    } else if (response.initialPrompt === "View All Employees") {
      db.query("select * from employee_tracker", function (err, results) {
        console.table(results);
        init();
      });
    } else if (response.initialPrompt === "Add Department") {
      const addDepartment = [
        {
          type: "input",
          message: "What is the name of the department?",
          name: "addDepartment"
        },
      ];
      inquirer.prompt(addDepartment)
      .then((answer) => {
        const departmentName = answer.addDepartment;
        db.query("INSERT INTO department (department) VALUES (?)", [departmentName], 
        function(err, result) {
          if (err) {
            console.error(err);
            return;
          }
        console.log(`Added ${departmentName} to the Database`);
        init();
        })
      })
    } else if (response.initialPrompt === "Add Role") {
      const addRole = [
        {
          type: "input",
          message: "What's the name of the role?",
          name: "role"
        },
        {
          type: "input",
          message: "Enter the salary.",
          name: "salary",
        },
        {
          type: "list",
          message: "Enter the department",
          choices: [],
          name: "department",
        },
      ];

        db.query("SELECT * FROM department", function (err, results) {
          if (err) {
            console.error(err);
            return;
          }
          addRole[2].choices = results.map(
            (department) => department.department
          );

          const departmentName = results.department;
          const departmentId = results.find(
            (department) => department.name === departmentName
          ).id;
        });

      inquirer.prompt(addRole).then((answer) => {
        const roleTitle = answer.role;
        const roleSalary = answer.salary;
        const roleDepartment = answer.department;
        db.query(
          "INSERT INTO role (title, salary, department) VALUES (?, ?)",
          [roleTitle, roleSalary, roleDepartment],
          function (err, result) {
            if (err) {
              console.error(err);
              return;
            }
            console.log(`Added ${roleTitle} to the Database`);
            init();
            }
          );
    });

    
    } else if (response.initialPrompt === "Add an Employee") {
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
          choices: [],
          name: "employeeRole",
        },
        {
          type: "list",
          message: "Who is the employee's manager?",
          choices: [],
          name: "employeeManager",
        },
      ];
      inquirer.prompt(addEmployee)
      init();
    } else if (response.initialPrompt === "Update Employee Role") {
      const updateEmployeeRole = [
        {
          type: "list",
          message: "Which employee's role do you want to update?",
          choices: [],
          name: "employeeRoleUpdate",
        },
        {
          type: "list",
          message: "Which role do you want to assign the selected employee?",
          choices: [],
          name: "employeeAssignedRole",
        },
      ];
      inquirer.prompt(updateEmployeeRole);
      init();
    }
  });
}

module.exports = init;
