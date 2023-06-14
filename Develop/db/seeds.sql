INSERT INTO department (id, name)
VALUES (1, "Pre-Production"),
       (2, "Prodcution"),
       (3, "Post-Production");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Writer", 45000.00, 1),
       (2, "Camera Operator", 65000.00, 2),
       (3, "Editor", 85000.00, 3),
       (4, "Manager", 100000.00, 1);

INSERT INTO employee_tracker (id, first_name, last_name, role_id)
VALUES (1, "Juan", "Davis", 1),
       (2, "Fransico", "Puertes", 2),
       (3, "Herb", "Sneed", 3),
       (4, "Shanda", "Hill", 4),
       (5, "Todd", "Jones", 4);
       
UPDATE employee_tracker
SET manager_id = 5
WHERE id IN (1, 2, 3, 4);

UPDATE employee_tracker
SET manager_id = NULL
WHERE id IN (5);