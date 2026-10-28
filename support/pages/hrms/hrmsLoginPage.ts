import { type Page, type Locator, expect } from "@playwright/test";

export class HrmsLoginPage {
  readonly employeeCode: Locator;
  readonly employeePassword: Locator;
  readonly loginWithSsoButton: Locator;
  readonly signInButton: Locator;
  constructor(readonly page: Page) {
    this.employeeCode = page.getByPlaceholder("Enter employee code");
    this.employeePassword = page.getByPlaceholder("Enter password");
    this.loginWithSsoButton = page.getByRole("button", {
      name: "Login WIth STULZ-SSO",
    });
    this.signInButton = page.getByRole("button", { name: "Sign in" });
  }

  async loginAndValidate(empCode: string, empPassoword: string) {
    await expect(this.loginWithSsoButton).toBeVisible();
    await this.loginWithSsoButton.click();
    await expect(this.page.url()).toContain("sso");

    await expect(this.employeeCode).toBeVisible();
    await this.employeeCode.fill(empCode);
    await expect(this.employeePassword).toBeVisible();
    await this.employeePassword.fill(empPassoword);

    await this.signInButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }
}
