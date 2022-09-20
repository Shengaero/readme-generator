// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const generateMarkdown = require('./utils/generateMarkdown');
const getUserArguments = require('./utils/arguments');
const questions = require('./utils/questions');

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    console.log(data);
    let markdown = generateMarkdown(data);
    console.log(markdown);
}

// TODO: Create a function to initialize app
function init() {
    let userArguments = getUserArguments();

    // TODO implement user arguments

    inquirer.prompt(questions)
        .then(answers => writeToFile('', answers))
        .catch(error => console.log(error));
}

// Function call to initialize app
init();
