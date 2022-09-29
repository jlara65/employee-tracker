const db = require('./db/connection');
const inquirer = require('inquirer');
const Employee = require('../../Module 10/team-profile-generator/lib/Employee');


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
                console.log('View All Employees')
                break;
            case "Add Employee":
                addEmployee()
                break;
            case "Update Employee Role":
                console.log('Update Employee Role')
                break;
            case "View All Roles":
                console.log('View All Roles')
                break;
            case "View All Departments":
                console.log('View All Departments')
                break;
            case "Add Department":
                console.log('Add Department')
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