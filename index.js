// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const path = require('path');
const { writeFile } = require('fs');

const generateMarkdown = require('./utils/generateMarkdown');
const getUserArguments = require('./utils/arguments');
const questions = require('./utils/questions');

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    console.log(data);
    let markdown = generateMarkdown(data);
    console.log(markdown);

    writeFile(fileName, markdown, ['w'], (err) => console.log(err));
}

// TODO: Create a function to initialize app
function init() {
    let userArguments = getUserArguments();

    // TODO implement user arguments
    let fileName = '.\\README.md';
    if(userArguments.output) {
        fileName = userArguments.output;
    }

    inquirer.prompt(questions)
        .then(answers => writeToFile(fileName, answers))
        .catch(error => console.log(error));
}

// Function call to initialize app
init();
