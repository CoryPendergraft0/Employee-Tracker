const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();
const mysql = require('mysql2');
require('console.table');

const db = mysql.createConnection({
    user: "root",
    database: "employee_db",
});

const selectAll = async (table) => {
    return await db.promise().query('SELECT * FROM ' + table);
};

const insert = (table, data) => {
    db.query('INSERT INTO ?? SET ?', [table, data], (err) => {
        if (err) return console.error(err);
        console.log('\nSuccessfully created!\n');
        init();
    });
};

const addEmployee = async () => {
    const [roleData] = await selectAll('role');
    const [employeeData] = await selectAll('employee');
    const roles = roleData.map(role => {
        return {
            name: role.title,
            value: role.id
        }
    });
    const managers = employeeData.map(employee => {
        return {
            name: employee.first_name + ' ' + employee.last_name,
            value: employee.id
        }
    });
    const answers = await prompt([
        {
            name: 'first_name',
            message: 'What is the employee`s first name?'
        },
        {
            name: 'last_name',
            message: 'What is the employee`s last name?'
        },
        {
            type: 'rawlist',
            name: 'role_id',
            message: 'What is the employee`s role?',
            choices: roles,
        },
        {
            type: 'rawlist',
            name: 'manager_id',
            message: 'Who is the employee`s manager?',
            choices: managers,
        }
    ])
   
    insert('employee', answers);
};
