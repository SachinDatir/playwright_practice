import { expect, type Page } from "@playwright/test";
import { submitAndWaitForResponse } from "../../wait-until";
import { LoginComponent } from "../../components/onsComponent/LoginForm";
type OAuthProvider = "NATIVE" | string;

export type CheckOAuthUserResponse = {
  data?: {
    userMaster?: {
      authProvider?: OAuthProvider;
    };
    outputData?:{
      unitOutput?:{}

    }
  };
  message?: string;
};

type LoginResponse = {
  status?: "success" | "error" | string;
  message?: string;
  data?: {
    token?: string;
  };
};

export class LoginPage {
  private readonly page: Page;
  readonly loginComponent: LoginComponent;

  constructor(page: Page) {
    this.page = page;
    this.loginComponent = new LoginComponent(page);
  }

  async expectAppOpened() {
    await expect(this.page).toHaveTitle("OneSelect | STULZ");
  }

  async loginAndValidate(email: string, password: string) {
    await this.loginComponent.open();
    await this.loginComponent.enterEmail(email);
    await this.loginComponent.expectReadyToSubmit();

    const checkOAuthResponse = await submitAndWaitForResponse(
      () => this.loginComponent.submit(),
      this.page,
      "checkOAuthUser",
    );
    const authResponseBody =
      (await checkOAuthResponse.json()) as CheckOAuthUserResponse;

    expect(authResponseBody.message).toBe("Data found");

    const authProvider = authResponseBody.data?.userMaster?.authProvider;
    if (authProvider !== "NATIVE") {
      throw new Error(
        `Unsupported auth provider "${authProvider ?? "unknown"}" for ${email}`,
      );
    }

    await this.loginComponent.enterPassword(password);
    await expect(this.loginComponent.loginButton).toBeEnabled();
    
    const loginResponse = await submitAndWaitForResponse(
      () => this.loginComponent.submit(),
      this.page,
      "auth/login",
    );
    const loginResponseBody = (await loginResponse.json()) as LoginResponse;

    if (loginResponseBody.status !== "success") {
      throw new Error(
        loginResponseBody.message ||
          "Check your password or your account is not present or INACTIVE",
      );
    }

    expect(loginResponseBody.message).toBe("Login Success");
    expect(loginResponseBody.data?.token).toBeTruthy();
  }
}
