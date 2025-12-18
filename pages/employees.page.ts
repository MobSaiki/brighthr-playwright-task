import { expect, Locator, Page } from "@playwright/test";
import employeeData from "../test-data/employees.json";

export type Employee = {
  firstName: string;
  lastName: string;
  email: string;
  sendRegistrationEmail: boolean;
  phoneNumber: string;
  startDate: Date;
  jobTitle: string;
};

export class EmployeesPage {
  private readonly employeesNavLink: Locator;
  private readonly addEmployeeButton: Locator;
  private readonly addAnotherEmployeeButton: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly phoneNumberInput: Locator;
  private readonly jobTitleInput: Locator;
  private readonly startDateControl: Locator;
  private readonly closeAddEmployeeButton: Locator;
  private readonly saveButton: Locator;
  private readonly successHeading: Locator;
  private readonly sendRegistrationCheckbox: Locator;
  private readonly sendRegistrationCheckboxLabel: Locator;

  constructor(private readonly page: Page) {
    this.employeesNavLink = page
      .getByLabel(new RegExp(employeeData.labels.navigationLabel, "i"))
      .getByRole("link", {
        name: new RegExp(employeeData.elementNames.employeesLink, "i"),
      });
    this.addEmployeeButton = page.getByRole("button", {
      name: new RegExp(employeeData.elementNames.addEmployeeButton, "i"),
    });
    this.addAnotherEmployeeButton = page.getByRole("button", {
      name: new RegExp(employeeData.elementNames.addAnotherEmployeeButton, "i"),
    });
    this.firstNameInput = page.getByLabel(
      new RegExp(employeeData.labels.firstNameLabel, "i"),
    );
    this.lastNameInput = page.getByLabel(
      new RegExp(employeeData.labels.lastNameLabel, "i"),
    );
    this.emailInput = page.getByRole("textbox", {
      name: new RegExp(employeeData.elementNames.emailField, "i"),
    });
    this.phoneNumberInput = page.getByLabel(
      new RegExp(employeeData.labels.phoneNumberLabel, "i"),
    );
    this.jobTitleInput = page.getByLabel(
      new RegExp(employeeData.labels.jobTitleLabel, "i"),
    );
    this.startDateControl = page
      .locator(employeeData.locators.startDatePicker)
      .getByTestId(employeeData.locators.dateTestId);
    this.saveButton = page.getByRole("button", {
      name: new RegExp(employeeData.elementNames.saveButton, "i"),
    });
    this.closeAddEmployeeButton = page.getByRole("button", {
      name: new RegExp(employeeData.elementNames.closeModalButton, "i"),
    });
    this.successHeading = page.getByRole("heading", {
      name: new RegExp(employeeData.elementNames.successHeading, "i"),
    });
    this.sendRegistrationCheckbox = page.getByTestId(
      employeeData.locators.sendRegistrationEmailCheckbox,
    );
    this.sendRegistrationCheckboxLabel = page.getByTestId(
      employeeData.locators.sendRegistrationEmailCheckboxLabel,
    );
  }

  async openAddEmployeeForm(): Promise<void> {
    await this.employeesNavLink.click();
    await expect(this.addEmployeeButton).toBeVisible();
    await this.addEmployeeButton.click();
  }

  async addAnotherEmployee(): Promise<void> {
    await expect(this.addAnotherEmployeeButton).toBeVisible();
    await this.addAnotherEmployeeButton.click();
  }

  async fillEmployeeForm(employee: Employee): Promise<void> {
    await this.firstNameInput.fill(employee.firstName);
    await this.lastNameInput.fill(employee.lastName);
    await this.emailInput.fill(employee.email);
    await this.setSendRegistrationEmail(employee.sendRegistrationEmail);
    await this.phoneNumberInput.fill(employee.phoneNumber);
    await this.selectStartDate(employee.startDate);
    await this.jobTitleInput.fill(employee.jobTitle);
  }

  async submitEmployeeForm(): Promise<void> {
    await expect(this.saveButton).toBeEnabled();
    await this.saveButton.click();
    await expect(this.successHeading).toBeVisible();
  }

  async closeAddEmployeeForm(): Promise<void> {
    await this.closeAddEmployeeButton.click();
  }

  async expectEmployeeListed(employee: Employee): Promise<void> {
    const fullName = `${employee.firstName} ${employee.lastName}`;
    await this.employeesNavLink.click();
    const nameHeading = this.page.getByRole("heading", {
      name: new RegExp(fullName, "i"),
    });
    await expect(nameHeading).toBeVisible();
  }

  private async selectStartDate(date: Date): Promise<void> {
    await this.startDateControl.click();
    const dayToSelect = date.toDateString();
    await this.page.getByRole("gridcell", { name: dayToSelect }).click();
  }

  private async setSendRegistrationEmail(
    shouldBeChecked: boolean,
  ): Promise<void> {
    const isChecked = await this.sendRegistrationCheckbox.isChecked();
    if (isChecked !== shouldBeChecked) {
      await this.sendRegistrationCheckboxLabel.click();
    }

    if (shouldBeChecked) {
      await expect(this.sendRegistrationCheckbox).toBeChecked();
    } else {
      await expect(this.sendRegistrationCheckbox).not.toBeChecked();
    }
  }

  async expectSaveDisabled(): Promise<void> {
    await expect(this.saveButton).toBeDisabled();
  }
}
