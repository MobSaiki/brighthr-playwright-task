import { Locator, Page, expect } from "@playwright/test";
import loginData from "../test-data/login.json";

export class LoginPage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;

  constructor(private readonly page: Page) {
    this.emailInput = page.getByLabel(
      new RegExp(loginData.labels.emailLabel, "i"),
    );
    this.passwordInput = page.getByLabel(
      new RegExp(loginData.labels.passwordLabel, "i"),
    );
    this.submitButton = page.getByRole("button", {
      name: new RegExp(loginData.elementNames.loginButton, "i"),
    });
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    await expect(this.page).toHaveURL(new RegExp(loginData.urls.dashboardUrl));
  }
}
