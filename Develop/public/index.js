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
          name: "addDepartment",
        },
      ];
      inquirer.prompt(addDepartment).then((answer) => {
        const departmentName = answer.addDepartment;
        db.query(
          "INSERT INTO department (department) VALUES (?)",
          [departmentName],
          function (err, result) {
            if (err) {
              console.error(err);
              return;
            }
            console.log(`Added ${departmentName} to the Database`);
            init();
          }
        );
      });
    } else if (response.initialPrompt === "Add Role") {
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
        addRole[2].choices = results.map((department) => department.department);

        inquirer.prompt(addRole).then((answer) => {
          const departmentId = results.find(
            (department) => department.department === answer.department
          ).id;
          const roleTitle = answer.role;
          const roleSalary = answer.salary;
          db.query(
            "INSERT INTO role (title, salary, department) VALUES (?, ?, ?)",
            [roleTitle, roleSalary, departmentId],
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

      db.query("SELECT * FROM role", function (err, results) {
      if (err) {
        console.error(err);
        return;
      }
      addEmployee[2].choices = results.map((role) => role.title);

      db.query("SELECT * FROM employee_tracker", function (err, results) {
        if (err) {
          console.error(err);
          return;
        }
      addEmployee[3].choices = results.map((employee_tracker) => employee_tracker.first_name + " " + employee_tracker.last_name);
      
      inquirer.prompt(addEmployee)
        .then((answer) => {
        const employeeFirstName = answer.employeeFirstName;
        const employeeLastName = answer.employeeLastName;
        const roleId = results.find(
        (role) => role.title === answer.role).id;
        const employeeManager = answer.employeeManager;

        db.query(
          "INSERT INTO employee_tracker (first_name, last_name, role_id) VALUES (?, ?, ?)",
          [employeeFirstName, employeeLastName, roleId],
          function (err, result) {
            if (err) {
              console.error(err);
              return;
            }
            console.log(`Added ${employeeFirstName + " " + employeeLastName} into the Database`);

          }
        );
      })





    });
    });

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
