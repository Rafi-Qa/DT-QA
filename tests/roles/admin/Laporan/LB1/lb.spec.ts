import { test, expect } from "@playwright/test";

test.describe("Admin can access and see report LB1", () => {
  test.use({ storageState: "tests/auth/roles/admin.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("/MedicalFacilityDashboard");
    await page.waitForLoadState("networkidle");
  });
  test("Admin can select dates and see report", async ({ page }) => {
    await page.getByRole("button", { name: "Laporan" }).click();
    await page.locator("a").filter({ hasText: "LB1" }).click();
    await page
      .locator(
        ".telerik-blazor.k-button.k-input-button.k-button-solid.k-button-md.k-button-solid-base.k-icon-button"
      )
      .click();

    await page.getByRole("button", { name: "June" }).click();
    await page
      .getByRole("button", { name: "Go to the previous period" })
      .click();
    await page.getByText("Jan", { exact: true }).click();
    await page.getByLabel("Sunday, January 1,").getByText("1").click();
    await page.getByRole("button", { name: "Lihat" }).click();
    await page
      .getByLabel("Report contents area")
      .getByText("Laporan Bulanan Data")
      .click();
  });
});
