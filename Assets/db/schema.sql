DROP DATABASE IF EXISTS employee_tracker.db;
CREATE DATABASE employee_tracker.db;

USE employee_tracker;

CREATE TABLE department (
  id INT NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee_tracker (
  id INT NOT NULL,
  first_name: VARCHAR(30),
  last_name: VARCHAR(30),
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
  manager_id INT,
  FOREIGN KEY (manager_id) REFERENCES employee_tracker(id) ON DELETE SET NULL,
  PRIMARY KEY (id)
);

