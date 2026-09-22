import { type Locator, type Page, expect } from "@playwright/test";

export class LoginComponent {
  readonly page: Page;
  readonly signUpLink: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpLink = page.getByRole("link", { name: " Sign Up " });
    this.emailInput = page.getByPlaceholder("E-mail");
    this.passwordInput = page.getByPlaceholder("Password");
    this.loginButton = page.locator(".login-btn");
  }

  async expectLoaded() {
    await expect(this.signUpLink).toBeEnabled();
    await this.page.waitForLoadState("domcontentloaded");
  }
  async open() {
    await this.page.goto("/");
    await this.page.waitForURL("**/auth/login");
    await this.expectLoaded();
  }

  async enterEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.loginButton.click();
  }

  async expectReadyToSubmit() {
    await expect(this.loginButton).toBeVisible();
    await expect(this.loginButton).toBeEnabled({ timeout: 100000 });
  }
}
