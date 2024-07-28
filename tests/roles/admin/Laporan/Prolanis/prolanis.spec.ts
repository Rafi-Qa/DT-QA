import { test, expect } from "@playwright/test";

test.use({ storageState: "tests/auth/roles/admin.json" });
test.beforeEach(async ({ page }) => {
  await page.goto("/MedicalFacilityDashboard");
  await page.waitForLoadState("load");
  await page.reload();
});

test("Admin can access and see report prolanis", async ({ page }) => {
  await page.getByRole("button", { name: "Laporan" }).click();
  await page
    .locator("a")
    .filter({ hasText: /^Prolanis$/ })
    .click();
  await expect(page.getByRole("heading", { name: "Prolanis" })).toBeVisible();
  await page.locator("button:near(.k-input-inner)").nth(0).click();
  await page.getByRole("button", { name: "June" }).click();
  await page.getByRole("button", { name: "2024" }).click();
  await page.getByText("2023", { exact: true }).click();
  await page.getByText("Jan").click();
  await page.getByLabel("Sunday, January 1,").getByText("1").click();
  await page.getByRole("button", { name: "Lihat" }).click();
  await expect(
    page.getByText("Laporan Prolanis", { exact: true })
  ).toBeVisible();
  await expect(
    page.getByText("Periode: 1 Jan 2023 s.d. 30 Jun 2024")
  ).toBeVisible();
  await expect(page.getByText("RADIAH M GADE")).toBeVisible();
});
