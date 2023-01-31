USE employee_db;
INSERT INTO department (name)
VALUES
('Engineering'), -- 1
('Finance'), -- 2
('Sales'), -- 3
('Human Resources'); -- 4

INSERT INTO role (title, salary, department_id)
VALUES
('Lead Engineer', 2500000, 1), -- 1 --
('Senior Engineer', 1600000, 1), -- 2 --
('Junior Engineer', 900000, 1), -- 3 --
('CFO', 1500000, 2), -- 4 --
('COO', 600000, 2), -- 5 --
('Financial Advisor', 170000, 2), -- 6 --
('Director of Sales', 140000, 3), -- 7 --
('Senior Salesperson', 120000, 3), -- 8 --
('Junior Salesperson', 70000, 3), -- 9 --
('H.R. Director', 150000, 4), -- 10 --
('H.R. Specialist', 90000, 4), -- 11 --
('Intern', 1, 4); -- 12 --


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Tony', 'Stark', 1, null),
('Bruce', 'Banner', 2, 1),
('Peter', 'Parker', 2, 1),
('King', 'TaChalla', 3, 1),
('Scott', 'Lang', 4, null),
('Pepper', 'Potts', 5, 4),
('Steve', 'Rodgers', 5, 4),
('Wanda', 'Maximoff', 6, 4),
('Susan', 'Storm', 7, null),
('Ben', 'Grim', 8, 7),
('Reed', 'Richards', 8, 7),
('Matt', 'Murdock', 9, 7)