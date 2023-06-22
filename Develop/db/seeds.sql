INSERT INTO department (department)
VALUES ("Pre-Production"),
       ("Prodcution"),
       ("Post-Production");

INSERT INTO role (title, salary, department)
VALUES ("Writer", 45000.00, 1),
       ("Camera Operator", 65000.00, 2),
       ("Editor", 85000.00, 3),
       ("Manager", 100000.00, 1);

INSERT INTO employee_tracker (first_name, last_name)
VALUES ("Juan", "Davis"),
       ("Fransico", "Puertes"),
       ("Herb", "Sneed"),
       ("Shanda", "Hill"),
       ("Todd", "Jones");
       
UPDATE employee_tracker
SET manager_id = 5
WHERE id IN (1, 2, 3, 4);

UPDATE employee_tracker
SET manager_id = NULL
WHERE id IN (5);