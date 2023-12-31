const inquirer = require('inquirer');
const db = require('../db');

//Initial Prompt
const initialPrompt = [
  {
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      'View All Departments',
      'View All Roles',
      'View All Employees',
      'Add Department',
      'Add Role',
      'Add an Employee',
      'Update Employee Role',
      'Quit',
    ],
    name: 'initialPrompt',
  },
];

// Init Function to start app
function init() {
  inquirer.prompt(initialPrompt).then(response => {
    // If statement displays department table query
    if (response.initialPrompt === 'View All Departments') {
      db.query(
        'SELECT DISTINCT department.id, department.department FROM department',
        function (err, results) {
          console.table(results);
          return init();
        }
      );
      // Else if statement displays role table query
    } else if (response.initialPrompt === 'View All Roles') {
      db.query(
        'SELECT DISTINCT role.id, role.title, role.salary, department.department AS department FROM role JOIN department ON role.department_id = department.id',

        function (err, results) {
          console.table(results);
          return init();
        }
      );
      // Else if statement displays employee_tracker table query that joins role and department tables
    } else if (response.initialPrompt === 'View All Employees') {
      db.query(
        'SELECT DISTINCT employee_tracker.id, employee_tracker.first_name, employee_tracker.last_name, role.title, role.salary, department.department AS department, employee_tracker.manager FROM employee_tracker JOIN role ON employee_tracker.role_id = role.id JOIN department ON role.department_id = department.id',
        function (err, results) {
          console.table(results);
          return init();
        }
      );
      // Else if statement that prompts addDepartment
    } else if (response.initialPrompt === 'Add Department') {
      const addDepartment = [
        {
          type: 'input',
          message: 'What is the name of the department?',
          name: 'addDepartment',
        },
      ];
      inquirer.prompt(addDepartment).then(answer => {
        // Inserts user response into department table
        const departmentName = answer.addDepartment;
        db.query(
          'INSERT INTO department (department) VALUES (?)',
          [departmentName],
          function (err, result) {
            if (err) {
              console.error(err);
              return;
            }
            console.log(`Added ${departmentName} to the Database`);
            return init();
          }
        );
      });
      // Else if statement that prompts addRole
    } else if (response.initialPrompt === 'Add Role') {
      const addRole = [
        {
          type: 'input',
          message: "What's the name of the role?",
          name: 'role',
        },
        {
          type: 'input',
          message: 'Enter the salary.',
          name: 'salary',
        },
        {
          type: 'list',
          message: 'Enter the department',
          choices: [],
          name: 'department',
        },
      ];
      // selects data from department table to populate department.list array
      db.query('SELECT * FROM department', function (err, departmentResults) {
        if (err) {
          console.error(err);
          return;
        }
        addRole[2].choices = departmentResults.map(
          department => department.department
        );

        inquirer.prompt(addRole).then(answer => {
          const departmentId = departmentResults.find(
            department => department.department === answer.department
          ).id;
          const roleTitle = answer.role;
          const roleSalary = answer.salary;
          // inserts title, salary and departmentId into role table
          db.query(
            'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
            [roleTitle, roleSalary, departmentId],
            function (err, departmentResults) {
              if (err) {
                console.error(err);
                return;
              }
              console.log(`Added ${roleTitle} to the Database`);
              return init();
            }
          );
        });
      });
      // Else if statement that prompts addEmployee
    } else if (response.initialPrompt === 'Add an Employee') {
      const addEmployee = [
        {
          type: 'input',
          message: "Enter the employee's first name.",
          name: 'employeeFirstName',
        },
        {
          type: 'input',
          message: "Enter the employee's last name.",
          name: 'employeeLastName',
        },
        {
          type: 'list',
          message: "What is the employee's role?",
          choices: [],
          name: 'employeeRole',
        },
        {
          type: 'list',
          message: "Who is the employee's manager?",
          choices: [],
          name: 'employeeManager',
        },
      ];
      // selects data from role table to populate addEmployee.employeeRole array
      db.query('SELECT * FROM role', function (err, employeeRoles) {
        if (err) {
          console.error(err);
          return;
        }
        addEmployee[2].choices = employeeRoles.map(role => role.title);
        /* selects id, first and last name from employee_tracker table, combines them under the column full_name. 
        This is user to populate addEmployee.employeeManager array. 
        */
        db.query(
          'SELECT id, CONCAT(first_name, " ", last_name) AS full_name FROM employee_tracker',
          function (err, managerResults) {
            if (err) {
              console.error(err);
              return;
            }
            addEmployee[3].choices = managerResults.map(
              employee_tracker => employee_tracker.full_name
            );

            addEmployee[3].choices.push('None');

            inquirer.prompt(addEmployee).then(answer => {
              const employeeFirstName = answer.employeeFirstName;
              const employeeLastName = answer.employeeLastName;
              const roleId = employeeRoles.find(
                role => role.title === answer.employeeRole
              ).id;

              const managerName = answer.employeeManager;
              const managerId =
                managerName === 'None'
                  ? null
                  : managerResults.find(
                      manager => manager.full_name === managerName
                    ).id;
              // inserts user response into the employee_tracker table
              db.query(
                'INSERT INTO employee_tracker (first_name, last_name, role_id, manager_id, manager) VALUES (?, ?, ?, ?, ?)',
                [
                  employeeFirstName,
                  employeeLastName,
                  roleId,
                  managerId,
                  managerName,
                ],
                function (err, currentEmployees) {
                  if (err) {
                    console.error(err);
                    return;
                  }
                  console.log(
                    `Added ${employeeFirstName} ${employeeLastName} into the Database`
                  );
                  return init();
                }
              );
            });
          }
        );
      });
      // Else if statement that prompts updateEmployeeRole
    } else if (response.initialPrompt === 'Update Employee Role') {
      const updateEmployeeRole = [
        {
          type: 'list',
          message: "Which employee's role do you want to update?",
          choices: [],
          name: 'employeeRoleUpdate',
        },
        {
          type: 'list',
          message: 'Which role do you want to assign the selected employee?',
          choices: [],
          name: 'employeeAssignedRole',
        },
      ];
      /* selects id, first and last name from the employee_tracker table, combines them under the column full_name. 
      This is used to populate updateEmployeerole.employeeRoleUpdate array. */
      db.query(
        'SELECT id, CONCAT(first_name, " ", last_name) AS full_name FROM employee_tracker',
        function (err, employeeResults) {
          if (err) {
            console.error(err);
            return;
          }

          updateEmployeeRole[0].choices = employeeResults.map(
            employee => employee.full_name
          );
          // selects data from role table, and populates updateEmployeerole.employeeAssignedRole array.

          db.query('SELECT * FROM role', function (err, roleResults) {
            if (err) {
              console.error(err);
              return;
            }

            updateEmployeeRole[1].choices = roleResults.map(role => role.title);

            inquirer.prompt(updateEmployeeRole).then(answer => {
              const employeeName = answer.employeeRoleUpdate;
              const roleName = answer.employeeAssignedRole;
              const role = roleResults.find(role => role.title === roleName);
              const employee = employeeResults.find(
                employee => employee.full_name === employeeName
              );
              const roleId = role.id;
              const employeeId = employee.id;

              // Updates the employee_tracker table with choosen new role.
              db.query(
                'UPDATE employee_tracker SET role_id = ? WHERE id = ?',
                [roleId, employeeId],
                function (err, result) {
                  if (err) {
                    console.error(err);
                    return;
                  }
                  console.log(`Updated ${employeeName}'s role in the Database`);
                  return init();
                }
              );
            });
          });
        }
      );
      // else if statement that quits the applicaiton.
    } else if (response.initialPrompt === 'Quit') {
      console.log('Exiting the application...');
      process.exit();
    }
  });
}

module.exports = init;
