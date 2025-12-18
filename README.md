# BrightHR QA Automation Task (Playwright)

This repository contains an automated test solution for the BrightHR QA Automation technical task, implemented using **Playwright**, **TypeScript**, and the **Page Object Model (POM)**.

---

## Task Description

The task consists of two main steps:

### Step 1 – Manual Setup
- Visit: https://sandbox-app.brighthr.com/lite
- Create a free BrightHR account manually

---

### Step 2 – Automation (Playwright)

Using Playwright, the following scenarios are automated:

1. Log in to the BrightHR Lite application
2. Navigate to the **Employees** tab
3. Add an employee by filling in all required and optional fields
4. Add a second employee
5. Verify that both employees are displayed in the employee list

---

## Tech Stack

- **Playwright**
- **TypeScript**
- **Page Object Model (POM)**
- **JSON test data**
- **Environment variables**
- **Cross-browser testing**
- **Allure reporting**

---

## Getting Started

Follow these steps to run the BrightHR Playwright tests on a new machine.

---

### Prerequisites

Make sure the following are installed:

- **Node.js** 

Now run:

- npm install
- npx playwright install

Environment variables

This project uses environment variables to manage login credentials.
A .env file is not committed to the repository and should be created locally when running the tests on your machine.

Create a .env file in the project root with the following values:
BRIGHTHR_BASE_URL=<URL>
BRIGHTHR_EMAIL=<username>
BRIGHTHR_PASSWORD=<password>

### Running Tests

To run all tests in headless mode: 
- npm run test

To view Allure test report:
- npm run allure:generate

To run tests on Chrome/Edge uncomment relevant lines in **playwright.config.ts**


