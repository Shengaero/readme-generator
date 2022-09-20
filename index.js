const inquirer = require('inquirer');
const {writeFile} = require('fs');

const generateMarkdown = require('./utils/generateMarkdown');
const {allowedArguments, getUserArguments} = require('./utils/arguments');
const questions = require('./utils/questions');

function renderHelp() {
    let helpString = 'Usage: node index.js [options...]\n\n';
    for(let key in allowedArguments) {
        let helpStringLine = '';
        let argument = allowedArguments[key];
        if(argument.short) {
            helpStringLine += `-${argument.short}, `;
        }
        helpStringLine += `--${argument.name}`;
        let headChars = 30 - helpStringLine.length;
        while(headChars >= 0) {
            helpStringLine += ' ';
            headChars--;
        }
        helpStringLine += argument.desc;
        helpStringLine += '\n';
        helpString += helpStringLine;
    }

    helpString += '\nFor additional help, visit https://github.com/Shengaero/readme-generator';
    console.log(helpString);
}

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

function checkIsHelp() {
    return process.argv.includes('-h') || process.argv.includes('--help');
}

function init() {
    // get the user arguments
    let userArguments = getUserArguments();
    if(userArguments.help || checkIsHelp()) {
        renderHelp();
        return;
    }

    // default filename to 'README.md' in the current working directory
    let fileName = '.\\README.md';
    // if the user specifies they want to output their README to a specific file
    if(userArguments.output) {
        // set the filename to the argument
        fileName = userArguments.output;
    }

    // if the user specifies they want to input their text in a text editor
    if(userArguments['input-in-editor']) {
        // switch the type of each 'input' question to 'editor'
        questions.forEach((q) => {
            if(q.type === 'input') {
                q.type = 'editor';
            }
        });
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
