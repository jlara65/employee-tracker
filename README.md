# employee-tracker
## Description
Command line application to view and manage the departments, roles, and employees database with content management systems interfaces. 

## Table of Contents
* [Description](#Description)
* [Installation](#Installation)
* [Usage](#Usage)
* [Contributing](#Contributing)
* [Questions](#Questions)
* [License](#License)

## Installation 
1. Download project by click ![Code button](https://img.shields.io/badge/-%E2%A4%93%20Code%20%E2%8F%B7-brightgreen)
 at the top of this repository and open project directory in terminal.

2. Requires the npm Inquirer version 8.2.4, mysql2, console.table, and FigLet packages:
      ```bash
      npm i mysql2
      npm i inquirer@8.2.4
      npm i console.table
      npm i figlet
      ```
3. Create database in MySQL using the files [schema](./db/schema.sql) and [seeds](./db//seeds.sql) located in `db` directory.
4. To pre-populate your database. Go to your terminal 
     ```bash
     mysql -u root -p
     [enter password]
     source db/schema.sql
     source db/seeds.sql
     exit
     ```
5. Ensure to update `connection.js` file with your MySQL username & password
## Usage

--> **[Walkthrough Video](https://watch.screencastify.com/v/YZ7lAzjuNY9EOtVaz2i7)** <--

1. Run `node server.js` in terminal 
2. Select an options from the menu and follow prompts to view or manage items in the company database
3. Select `Quit` on main menu to exit the app

## Contributing
1. Fork this repository
2. Create a new branch
3. Commit changes on your branch
4. Push your changes
5. Create a new pull request
## Questions
If you have any question or would like to report the issues in this project, please feel free to contact me at email_to_be_annouced@domain.com

## License 
This project is license under the [MIT](./LICENSE)

&copy; 2022 Joseph Lara