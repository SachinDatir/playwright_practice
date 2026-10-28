// import { test as setup, expect } from "@playwright/test";
// import { HrmsLoginPage } from "../../support/pages/hrms/hrmsLoginPage";
// const authFile = "playwright/.auth/user.json";
// const employeeCode: string = process.env.EMPLOYEE_CODE;
// const employeePassword: string = process.env.EMPLOYEE_PASSWORD;
// let loginPage: HrmsLoginPage;
// setup("authenticate", async ({ page }) => {
//   loginPage = new HrmsLoginPage(page);
//   await page.goto(process.env.HRMS_URL!);
//   await loginPage.loginAndValidate(employeeCode, employeePassword);
//   await expect(page.getByRole("link", { name: "STULZ-HRMS" })).toContainText(
//     "STULZ-HRMS",
//   );

//   await page.context().storageState({ path: authFile });
// });
