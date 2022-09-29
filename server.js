const db = require('./db/connection');
const inquirer = require('inquirer');
const Employee = require('../../Module 10/team-profile-generator/lib/Employee');
require('console.table');


db.connect(err => {
    if (err) throw err;
    console.log(`
    +=======================================================+
    | HELLO EMPLOYEE MANAGER                                |
    |                                                       |
    +=======================================================+
    `)
    startApp();
});

// prompt inquirer
const startApp = () => {
    return inquirer.prompt ([
        {
            type: 'list',
            name: 'option',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'View All Departments',
                'Add Department'
            ]
        }
    ])
    .then(answers => {
        switch (answers.option){
            case "View All Employees":
                getAllEmployees()
                break;
            case "Add Employee":
                addEmployee()
                break;
            case "Update Employee Role":
                console.log('Update Employee Role')
                break;
            case "View All Roles":
                getAllRoles()
                break;
            case "View All Departments":
                getAllDepartments()
                break;
            case "Add Department":
                addDepartment()
                break;
        }
    });
};

const addEmployee = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'first_name',
            message: "Employee's first name? ",
            validate: fnInput => {
                if(fnInput) {
                    return true;
                } else {
                    console.log('Please enter a valid first name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'last_name',
            message: "Employee's last name? ",
            validate: lnInput => {
                if(lnInput) {
                    return true;
                } else {
                    console.log('Please enter a valid last name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'role_id',
            message: "Employee's role? ",
            validate: roleInput => {
                if(roleInput) {
                    return true;
                } else {
                    console.log('Please enter a role!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'manager_id',
            message: "Employee's manager? "
        },

    ])
    .then(answers => {
        console.log(`${answers.first_name} ${answers.last_name} has added to database!`);
        startApp();
    });
};

const addDepartment = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'deptName',
            message: 'What is the name of the department?'
        }
    ])
    .then(answer => {
        const sql = `INSERT INTO departments (name)
                 VALUES ('${answer.deptName}')`;
        db.query(sql, function (err, results) {
            console.log(`${answer.deptName} has added to the Department database!`);
            startApp();
        });
    })
    
}

const getAllEmployees = () => {
    const sql = `SELECT employees.id AS 'Employee ID', 
                        employees.first_name AS 'First Name', 
                        employees.last_name AS 'Last Name',
                        roles.title AS Title, 
                        departments.name AS Department, 
                        roles.salary AS Salary, 
                        CONCAT(manager.first_name,' ',manager.last_name )  AS Manager
                FROM employees 
                LEFT JOIN roles ON employees.role_id = roles.id 
                LEFT JOIN departments ON roles.department_id = departments.id 
                LEFT JOIN employees manager ON manager.id = employees.manager_id ORDER BY employees.id`;

    db.query(sql, function (err, results) {
        console.table(results);
        startApp();
    });
}

const getAllDepartments = () => {
    const sql = `SELECT departments.id AS 'ID', 
                        departments.name AS 'Department Name'
                 FROM departments`;

    db.query(sql, function (err, results) {
        console.table(results);
        startApp();
    });
}

const getAllRoles = () => {
    const sql = `SELECT roles.id as ID, 
                        roles.title as 'Job Title', 
                        departments.name as Department, 
                        roles.salary as Salary  
                 FROM roles 
                 LEFT JOIN departments ON roles.department_id = departments.id`;

    db.query(sql, function (err, results) {
        console.table(results);
        startApp();
    });
}
