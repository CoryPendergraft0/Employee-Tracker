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

const addRole = async () => {
    const [departmentData] = await selectAll('department');
    
    const departments = departmentData.map(department => {
        return {
            name: department.name,
            value: department.id
        }
    });
    const answers = await prompt([
        {
            name: 'title',
            message: 'What is the role`s title?'
        },
        {
            name: 'salary',
            message: 'What is the salary for the role?'
        },
        {
            type: 'rawlist',
            name: 'department_id',
            message: 'What department does this role belong to?',
            choices: departments,
        },
    ])
    
    insert('role', answers);
};

const addDepartment = async () => {
    const answers = await prompt([{
        name: 'name',
        message: 'What is the name of this department?'
    }
    ])
    
    insert('department', answers);
};

const choicesOption = async (type) => {
    switch (type) {
        case 'View All Employees': {
            const [data] = await selectAll('employee');
            console.table(data);
            init();
            break;
        }
        case 'View All Departments': {
            const [data] = await selectAll('department');
            console.table(data);
            init();
            break;
        }
        case 'View All Roles': {
            const [data] = await selectAll('role');
            console.table(data);
            init();
            break;
        }
        case 'Add Employee': {
            await addEmployee();
            break;
        }
        case 'Add Department': {
            await addDepartment();
            break;
        }
        case 'Add Role': {
            await addRole();
            break;
        }
        
    }
};