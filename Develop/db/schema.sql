DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id) 
  REFERENCES department(id) ON DELETE SET NULL,
  department VARCHAR(30)
);

CREATE TABLE employee_tracker (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  full_name VARCHAR(30),
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
  title VARCHAR(30), 
  manager_id INT,
  FOREIGN KEY (manager_id) REFERENCES employee_tracker(id) ON DELETE SET NULL,
  manager VARCHAR(30)
);

UPDATE employee_tracker
SET full_name = CONCAT(first_name, ' ', last_name)
WHERE id IS NOT NULL;



