const path = require('path');

const trimUserInput = value => value.trim();

const createLicense = (name, link, badge, short = name) => ({
    name: name,
    short: short,
    value: {
        name: name,
        link: link,
        badge: badge
    },
});

function requireNonEmptyValue(value) {
    if(value.trim().length === 0) {
        return `Invalid value: must be non-empty ${this.name}!`;
    }
    return true;
}

module.exports = [
    {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the project:',
        default: () => {
            let cwd = process.cwd();
            let dir = path.basename(cwd);
            return dir;
        },
        transformer: trimUserInput,
        get validate() {
            return requireNonEmptyValue.bind(this);
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter a description of the project:',
        transformer: trimUserInput,
        get validate() {
            return requireNonEmptyValue.bind(this);
        }
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Enter the installation instructions for the project:',
        transformer: trimUserInput,
        get validate() {
            return requireNonEmptyValue.bind(this);
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Enter information on the project usage:',
        transformer: trimUserInput,
        get validate() {
            return requireNonEmptyValue.bind(this);
        }
    },
    {
        type: 'input',
        name: 'contribution',
        message: 'Enter details on how others can/should contribute to the project:',
        transformer: trimUserInput,
        get validate() {
            return requireNonEmptyValue.bind(this);
        }
    },
    {
        type: 'input',
        name: 'testing',
        message: 'Enter information on how developers can test this project:',
        transformer: trimUserInput,
        get validate() {
            return requireNonEmptyValue.bind(this);
        }
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license:',
        choices: [
            createLicense('Apache 2.0 License', 'https://opensource.org/licenses/Apache-2.0', 'License-Apache_2.0-blue.svg'),
            createLicense('GNU General Public License v3.0', 'https://www.gnu.org/licenses/gpl-3.0', 'License-GPLv3-blue.svg', 'GNU GPL v3'),
            createLicense('MIT License', 'https://opensource.org/licenses/MIT', 'License-MIT-yellow.svg'),
            createLicense('BSD 2-Clause License', 'https://opensource.org/licenses/BSD-2-Clause', 'License-BSD_2--Clause-orange.svg'),
            createLicense('BSD 3-Clause License', 'https://opensource.org/licenses/BSD-3-Clause', 'License-BSD_3--Clause-blue.svg'),
            createLicense('Eclipse Public License 1.0', 'https://opensource.org/licenses/EPL-1.0', 'License-EPL_1.0-red.svg')
        ]
    }
];
