INSERT INTO department (department_name)
VALUES  ("Marketing"),
        ("Creative"),
        ("Finance"),
        ("Research and Development"),
        ("Customer Service"),
        ("Legal");

INSERT INTO roles (id, title, salary, department_id)
VALUES  (1, "Manager", 150000, 1),
        (2, "Supervisor", 150000, 2),
        (3, "Admin", 150000, 3),
        (4, "Instructor", 150000, 4),
        (5, "Employee", 250000, 5),
        (6, "Associate", 150000, 6);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1, "John", "Wick", 1, 5),
        (2, "Harry", "Potter", 2, 1),
        (3, "Tony", "Stark", 3, 3),
        (4, "Peter", "Quill", 3, 1),
        (5, "Justin", "Bieber", 4, 6),
        (6, "Bruce", "Banner", 5, 2),
        (2, "Duppy", "Tory", 5, 3),
        (3, "Anthony", "Winters", 6, 1);