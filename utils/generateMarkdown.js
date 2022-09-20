const shieldBadgeURLPrefix = 'https://img.shields.io/badge/';

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
    return `[![License](${shieldBadgeURLPrefix}${license.badge})](${renderLicenseLink(license)})`;
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
    return license.link;
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
    return `is available under the [${license.name}](${renderLicenseLink(license)})`;
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
    return `${renderLicenseBadge(data.license)}
# ${data.title}
${data.description}

# Installation Instructions
${data.installation}

# License
${data.title} ${renderLicenseSection(data.license)}.`.trim();
}

module.exports = generateMarkdown;
