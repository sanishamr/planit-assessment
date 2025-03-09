Playwright UI Test Automation

Project Overview

This project automates UI tests for the Jupiter Toys web application using Playwright with TypeScript. The tests validate form submissions on the Contact page and cart calculations on the Shopping Cart page. The framework follows an Object-Oriented Design (POM) and is structured to run within a Continuous Integration pipeline (e.g., Jenkins).

Prerequisites

Ensure you have the following installed:

Node.js (LTS version recommended)

Playwright

Installation

Clone the repository:

git clone <repository-url> 
url : https://github.com/sanishamr/planit-assessment
cd <repository-folder>

Install dependencies:

npm install

Install Playwright browsers:

npx playwright install

Test Execution

Run all tests:

npx playwright test

Run a specific test file:

npx playwright test tests/contactForm.spec.ts

Run tests in headed mode:

npx playwright test --headed

Run tests with verbose logging:

npx playwright test --debug

Test Structure

/playwright-tests
  /pages            # Page Object Model (POM) files
    contactPage.ts  # Contact form interactions
    homePage.ts     # Home page interactions
    cartPage.ts     # Shopping cart interactions
    shopPage.ts     # shop page interations
  /tests            # Test specifications
    validationJupiterPage-Fixture.spec  #  validation tests
  playwright.config.ts  # Playwright global configuration
  package.json      # Project dependencies
  README.md         # Project documentation

Continuous Integration (CI)

This project is ready to integrate with Jenkins or other CI/CD tools. To run tests in a CI pipeline:

Ensure dependencies are installed (npm ci)

Run tests using npx playwright test

Generate test reports if needed

Reporting

Playwright provides built-in test reporting. Generate an HTML report:

npx playwright test --reporter=html

Open the report:

npx playwright show-report

