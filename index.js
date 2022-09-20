const inquirer = require('inquirer');
const { writeFile } = require('fs');

const generateMarkdown = require('./utils/generateMarkdown');
const getUserArguments = require('./utils/arguments');
const questions = require('./utils/questions');

function writeToFile(fileName, data) {
    // generate the markdown
    let markdown = generateMarkdown(data);

    // write it to a file
    writeFile(fileName, markdown, ['w'], (err) => {
        if(err !== null) {
            console.error(err);
        }
    });
}

function init() {
    // get the user arguments
    let userArguments = getUserArguments();

    // default filename to 'README.md' in the current working directory
    let fileName = '.\\README.md';
    if(userArguments.output) {
        fileName = userArguments.output;
    }

    // prompt the user the questions
    inquirer.prompt(questions)
        // when the user answers them, write to the target file
        .then(answers => writeToFile(fileName, answers))
        // catch and log any errors
        .catch(error => console.error(error));
}

// function call to initialize app
init();
