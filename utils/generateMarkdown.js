const shieldBadgeURLPrefix = 'https://img.shields.io/badge/';

function renderLicenseBadge(license) {
    if(!license) {
        return '';
    }

    return `[![License](${shieldBadgeURLPrefix}${license.badge})](${renderLicenseLink(license)})`;
}

function renderLicenseLink(license) {
    if(!license) {
        return '';
    }

    return license.link;
}

function renderLicenseSection(license) {
    if(!license) {
        return '';
    }

    return `is available under the [${license.name}](${renderLicenseLink(license)})`;
}

function generateMarkdown(data) {
    return (
`${renderLicenseBadge(data.license)}
# ${data.title}
${data.description}

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Contribution](#contribution)
* [Testing](#testing)
* [License](#license)

## Installation
${data.installation}

## Usage
${data.usage}

## Contibution
${data.contribution}

## Testing
${data.testing}

## License
${data.title} ${renderLicenseSection(data.license)}.`
    ).trim();
}

module.exports = generateMarkdown;
