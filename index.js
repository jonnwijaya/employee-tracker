const inquirer = require("inquirer");
// Import and require mysql2

const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: 'Q#aFvQ6#uiJ',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

const init = () => { employeeTrackerOptions() }

const employeeTrackerOptions = () => {
    inquirer.prompt(employeePrompt)
        .then(answer => {
            if (answer.toDo === "View All Employees") {
                viewAllEmployees();
            } else if (answer.toDo === "Add Employee") {
                addEmployee();
            } else if (answer.toDo === "Update Employee Role") {
                updateEmployee();
            } else if (answer.toDo === "View All Roles") {
                viewAllRoles();
            } else if (answer.toDo === "Add Role") {
                addRole();
            } else if (answer.toDo === "View All Departments") {
                viewAllDeparments();
            } else if (answer.toDo === "Add Department") {
                addDepartment();
            } else {
                return;
            };
        });
};

const employeePrompt = [
    {
        type: 'list',
        message: "What would you like to do?",
        name: "toDo",
        choices: [
            { name: 'View All Employees' },
            { name: 'Add Employee' },
            { name: 'Update Employee Role' },
            { name: "View All Roles" },
            { name: 'Add Role' },
            { name: 'View All Departments' },
            { name: 'Add Department' },
            { name: 'Quit' }
        ],
    },
];

const selectEmployee = () => {
    inquirer.prompt(selectEmployeePrompt)
        .then(answer => {

        })
}

const selectEmployeePrompt = [
    {
        type: 'list',
        name: 'chooseEmployee',
        choices: [

        ],
    },
];

function updateEmployee() {
    db.query('SELECT * FROM employee', function (err, results) {
        if (err) {
            console.error(err);
            return;
        }
        console.table(results);
        selectEmployee();
    });
}

function viewAllDeparments() {
    db.query('SELECT * FROM department', function (err, results) {
        if (err) {
            console.error(err);
            return;
        }
        console.table(results);
        employeeTrackerOptions();
    });
}

function viewAllRoles() {
    db.query('SELECT * FROM roles', function (err, results) {
        if (err) {
            console.error(err);
            return;
        }
        console.table(results);
        employeeTrackerOptions();
    });
}

function viewAllEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
        if (err) {
            console.error(err);
            return;
        }
        console.table(results);
        employeeTrackerOptions();
    });
}

function addDepartment() {
    inquirer.prompt(addingDepartment).then((addDepartmentResponse) => {
        const sql = `INSERT INTO department (department_name) VALUES (?)`;
        const params = addDepartmentResponse.department;
        db.query(sql, params, (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(addDepartmentResponse.department);
            console.table(result);
            employeeTrackerOptions();
        })
    });
}

function addRole() {
    inquirer.prompt(addingRole).then((addRoleResponse) => {
        const sql = `INSERT INTO roles (id, title, salary) VALUES (?, ?, ?)`;
        const params = [addRoleResponse.roleId, addRoleResponse.roleName, addRoleResponse.salary, addRoleResponse.roleDepartment];
        db.query(sql, params, (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            console.table(result);
            employeeTrackerOptions();
        })
    });
}

function addEmployee() {
    inquirer.prompt(addingEmployee).then((addEmployeeResponse) => {
        const sql = `INSERT INTO employee (first_name, last_name) VALUES (?, ?)`;
        const params = [addEmployeeResponse.firstName, addEmployeeResponse.lastName];
        db.query(sql, params, (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            console.table(result);
            employeeTrackerOptions();
        })
    });
}

const addingDepartment = [
    {
        type: 'input',
        name: 'department',
        message: 'What is the name of the department?',
    }
];

const addingRole = [
    {
        type: 'input',
        name: 'roleId',
        message: 'What is the ID of the role?',
    },
    {
        type: 'input',
        name: 'roleName',
        message: 'What is the name of the role?',
    },
    {
        type: 'input',
        name: 'salary',
        message: 'What is the salary for the role?',
    },
    {
        type: 'input',
        name: 'roleDepartment',
        message: 'What department is the role within?',
    },
];

const addingEmployee = [
    {
        type: 'input',
        name: 'firstName',
        message: 'What is the employees first name?',
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'What is the employees last name?',
    },
    {
        type: 'input',
        name: 'employeeRole',
        message: "What is the employee's role?",
    },
    {
        type: 'input',
        name: 'managersId',
        message: "What is the ID of the employee's manager?",
    },
];

init()