import { test } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { EmployeesPage, type Employee } from "../pages/employees.page";
import employeeData from "../test-data/employees.json";

let BRIGHTHR_EMAIL: string;
let BRIGHTHR_PASSWORD: string;

test.beforeAll(() => {
  const { BRIGHTHR_EMAIL: email, BRIGHTHR_PASSWORD: password } = process.env;

  if (!email || !password) {
    throw new Error(
      "Missing env vars. Please set BRIGHTHR_EMAIL and BRIGHTHR_PASSWORD.",
    );
  }

  BRIGHTHR_EMAIL = email;
  BRIGHTHR_PASSWORD = password;
});

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const employeesPage = new EmployeesPage(page);

  await page.goto("/");
  await loginPage.login(BRIGHTHR_EMAIL, BRIGHTHR_PASSWORD);
  await employeesPage.openAddEmployeeForm();
});

test("add two employees and verify they are listed", async ({ page }) => {
  const employeesPage = new EmployeesPage(page);
  const runId = Date.now();
  const john = employeeData.employees.johnDoe;
  const jane = employeeData.employees.janeSmith;

  const employee1: Employee = {
    ...john,
    firstName: `${john.firstName}${runId}`,
    lastName: `${john.lastName}${runId}`,
    email: `john.doe.${runId}@example.com`,
    startDate: new Date(john.startDate),
  };
  const employee2: Employee = {
    ...jane,
    firstName: `${jane.firstName}${runId}`,
    lastName: `${jane.lastName}${runId}`,
    email: `jane.smith.${runId}@example.com`,
    startDate: new Date(jane.startDate),
  };

  await employeesPage.fillEmployeeForm(employee1);
  await employeesPage.submitEmployeeForm();
  await employeesPage.addAnotherEmployee();
  await employeesPage.fillEmployeeForm(employee2);
  await employeesPage.submitEmployeeForm();
  await employeesPage.closeAddEmployeeForm();
  await employeesPage.expectEmployeeListed(employee1);
  await employeesPage.expectEmployeeListed(employee2);
});

test("Cannot add employee with invalid email address", async ({ page }) => {
  const employeesPage = new EmployeesPage(page);
  const invalid = employeeData.employees.invalidEmployee;
  const invalidEmployee: Employee = {
    ...invalid,
    startDate: new Date(invalid.startDate),
  };

  await employeesPage.fillEmployeeForm(invalidEmployee);
  await employeesPage.expectSaveDisabled();
});
