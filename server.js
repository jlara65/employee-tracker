const db = require('./db/connection');
const inquirer = require('inquirer');
const figlet = require('figlet');
// const { listenerCount } = require('./db/connection');
require('console.table');


db.connect(err => {
    if (err) throw err;
    console.log(figlet.textSync('Welcome Employee Manager!'));
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
                'Add Role',
                'View All Departments',
                'Add Department',
                'Done'
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
                updateEmployeeRole()
                break;
            case "View All Roles":
                getAllRoles()
                break;
            case "Add Role":
                addRole()
                break;
            case "View All Departments":
                getAllDepartments()
                break;
            case "Add Department":
                addDepartment()
                break;
            case "Done":
                quit()
                break;
        }
    });
};

const addEmployee = async () => {
    try {
        console.log('Employee Add');

        let roles = await db.query(`SELECT * FROM roles`);

        let managers = await db.query(`SELECT * FROM employees`);

        let answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Please enter the employee first name?'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Please enter the employee last name?'
            },
            {
                type: 'list',
                name: 'role_id',
                message: "What is this Employee's role id?",
                choices: roles.map((role) => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                }),
            },
            {
                type: 'list',
                name: 'manager_id',
                message: "What is this Employee's Manager's Id?",
                choices: managers.map((manager) => {
                    return {
                        name: manager.first_name + " " + manager.last_name,
                        value: manager.id
                    }
                }),
            }
        ])

        let result = await db.query("INSERT INTO employees SET ?", {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: (answer.role_id),
            manager_id: (answer.manager_id)
        });

        console.log(`${answer.first_name} ${answer.last_name} added successfully.\n`);
       startApp();

    } catch (err) {
        console.log(err);
        db.end();
    };
}

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

const addRole = () => {
    const sql ='SELECT * FROM departments';

    db.query(sql, (err, result) => {
        if (err) throw err;

        inquirer.prompt ([
            {
                type: 'input',
                name: 'roleName',
                message: 'What is the name of role? '
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'What is the salary of the role? '
            },
            {
                type: 'rawlist',
                name: 'roleDept',
                message: 'Which department does this role belong to? ',
                choices: function () {
                    var arrChoices = [];
                    for (var i = 0; i < result.length; i++) {
                        arrChoices.push(result[i].name);
                    }
                    return arrChoices;
                }
            }
        ])
        .then((answer) => {
            const sql = `SELECT * FROM departments
                         WHERE ?`;
            
            db.query(sql, { name: answer.roleDept }, (err, result) => {
                if (err) throw err;
                console.log(result[0].id);

                const sql2 = `INSERT INTO roles SET ?`;
                db.query(sql2, {title: answer.roleName, salary: answer.roleSalary, department_id: parseInt(result[0].id)});
            });
            console.log('Role has been added to database..');
            startApp();
        });
    });
}

const updateEmployeeRole = async () => {
    try {
        console.log("Update Employee's role");

        let employees = await db.query(`SELECT * FROM employees`);
        let employeeChoice = await inquirer.prompt([
            {
                type: 'list',
                name: 'employeePick',
                message: "Which employee's role do you want to update? ",
                choices: employees.map((employeeName) => {
                    return {
                        name: employeeName.first_name + " " + employeeName.last_name,
                        value: employeeName.id
                    }
                })
            }
        ]);
        let roles = await db.query(`SELECT * FROM roles`);
        let roleChoice = await inquirer.prompt([
            {
                type: 'list',
                name: 'rolePick',
                message: 'Which role do you want to assign the selected employee? ',
                choices: roles.map((roleName) => {
                    return {
                        name: roleName.title,
                        value: roleName.id
                    }
                })
            }
        ]);

        let result = await db.query(`UPDATE employees SET ? WHERE ?`,
                                     [{ role_id: roleChoice.rolePick }, { id: employeeChoice.employeePick }]);
        
        console.log("Updated the employee's role");
        startApp();
    } catch (err) {
        console.log(err);
        db.end();
    };
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

const quit = () => {
    inquirer.prompt({
        type: 'confirm',
        name: 'quitResponse',
        message: 'End this application?'
    })
    .then((answer) => {
        if (answer.quitResponse === true) {
            console.log(figlet.textSync('BYE!!'));
            db.end();
        } else {
            startApp();
        };
    })
}