const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();
const mysql = require('mysql2');
require('console.table');

const db = mysql.createConnection({
    user: "root",
    database: "employee_db",
});

const chooseOption = (type) => {
    switch (type) {
        case 'VIEW ALL EMPLOYEES': {
            db.query('SELECT * FROM employee', (err, employee) => {
                console.table(employee);
                init();
            });
            break;
        }
        case 'VIEW ALL DEPARTMENTS': {
            db.query('SELECT * FROM department', (err, department) => {
                console.table(department);
                init();
            });
            break;
        }
        case 'VIEW ALL ROLES': {
            db.query('SELECT * FROM role', (err, roles) => {
                console.table(roles);
                init();
            });
            break;
        }
    }
}

const init = () => {
    prompt({
        type: 'rawlist',
        message: 'Choose one of the following categories to view',
        name: 'type',
        choices: [
            'VIEW ALL EMPLOYEES',
            'VIEW ALL DEPARTMENTS',
            'VIEW ALL ROLES',
        ],
    })
        .then((answers) => {
            chooseOption(answers.type)
        });
}

init();