const shieldBadgeURLPrefix = 'https://img.shields.io/badge/';

function renderLicenseBadge(license) {
    if(!license) {
        return '';
    }

    return `[![License](${shieldBadgeURLPrefix}${license.badge})](${renderLicenseLink(license)})\n`;
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

function buildTableOfContents(data) {
    let content = '\n## Table of Contents\n';
    if(data.installation && data.installation.length !== 0) {
        content += '* [Installation](#installation)\n';
    }
    if(data.usage && data.usage.length !== 0) {
        content += '* [Usage](#usage)\n';
    }
    if(data.contribution && data.contribution.length !== 0) {
        content += '* [Contribution](#contribution)\n';
    }
    if(data.testing && data.testing.length !== 0) {
        content += '* [Testing](#testing)\n';
    }
    if(data.license) {
        content += '* [License](#license)\n';
    }
    return content;
}

function generateMarkdown(data) {
    return (`${renderLicenseBadge(data.license)}# ${data.title}
${data.description}
${data.hasTableOfContents ? buildTableOfContents(data) : ''}
## Installation
${data.installation}

## Usage
${data.usage}

## Contibution
${data.contribution}

## Testing
${data.testing}${data.license ? `

## License
${data.title} ${renderLicenseSection(data.license)}.` : ''}
`);
}

module.exports = generateMarkdown;
