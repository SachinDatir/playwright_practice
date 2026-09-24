import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/oneSelect/LoginPage";
import { waitForApi } from "../utils/wait-until";
import { type Response, type Page } from "@playwright/test";

const dashboardCalculationApis = [
  "condenserList",
  "condenserFormatted",
  "thestEvaporatorExpertCalculation",
  "compressorExpertCalculation",
] as const;

type Fixtures = {
  loginPage: LoginPage;
  cyberAirCalculationResponses: Promise<Response[]>;
  clickAndWaitForResponse: (
    action: () => Promise<unknown>,
    page: Page,
    urlPart: string,
  ) => Promise<Response>;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  cyberAirCalculationResponses: async ({ page }, use) => {
    const responses = Promise.all(
      dashboardCalculationApis.map((api) => waitForApi(page, api)),
    );

    await use(responses);
  },
  clickAndWaitForResponse: async ({}, use) => {
    const helperFn = async (
      action: () => Promise<unknown>,
      targetPage: Page,
      urlPart: string,
    ): Promise<Response> => {
      const [response] = await Promise.all([
        targetPage.waitForResponse((apiResponse) =>
          apiResponse.url().includes(urlPart),
        ),
        action(),
      ]);

      if (response.status() !== 200) {
        const body = await response.text().catch(() => "No body");
        throw new Error(
          `API call to "${urlPart}" failed with status ${response.status()}.\nResponse Body: ${body}`,
        );
      }
      return response;
    };

    await use(helperFn);
  },
});
export { expect } from "@playwright/test";
