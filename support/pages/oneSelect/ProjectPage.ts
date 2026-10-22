import { Page, type Locator, expect } from "@playwright/test";
import { MyProject } from "../../components/onsComponent/MyProject";
export class ProjectPage {
  projectSelection: MyProject;
  constructor(readonly page: Page) {
    this.projectSelection = new MyProject(page);
  }
}
