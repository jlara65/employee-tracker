const db = require('./db/connection');
const inquirer = require('inquirer');


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
                console.log('Add Employee')
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