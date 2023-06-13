INSERT INTO department(id, name)
VALUES (001, "Pre-Production"),
       (002, "Prodcution"),
       (003, "Post-Production");

INSERT INTO role(id, title, salary, department_id)
VALUES (001, "Writer", 45000.00, 001),
       (002, "Camera Operator", 65000.00, 002),
       (003, "Editor", 85000.00, 003),
       (004, "Manager", 100000.00, 001);

INSERT INTO employee_tracker(id, first_name, last_name, role_id, manager_id)
VALUES (001, "Juan", "Davis", 001, 004),
       (002, "Fransico", "Puertes", 002, 004),
       (003, "Herb", "Sneed", 003, 004),
       (004, "Shanda", "Hill", 004,);