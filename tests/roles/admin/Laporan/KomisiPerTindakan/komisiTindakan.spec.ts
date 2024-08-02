import { test, expect } from "@playwright/test";

test.use({ storageState: "tests/auth/roles/admin.json" });
test.beforeEach(async ({ page }) => {
  await page.goto("/MedicalFacilityDashboard");
  await page.waitForLoadState("load");
  await page.reload();
});

test("admin can access and see report komisi tindakan", async ({ page }) => {
  await page.getByRole("button", { name: "Laporan" }).click();
  await page.locator("a").filter({ hasText: "Komisi per Tindakan" }).click();
  await expect(
    page.getByRole("heading", { name: "Komisi per Tindakan" })
  ).toBeVisible();
  await page.locator("button:near(.k-input-inner)").nth(0).click();
  await page.getByLabel("Tuesday, July 30,").getByText("30").click();
  await page.getByRole("button", { name: "Lihat" }).click();
  await expect(page.getByText("Laporan Komisi per Tindakan")).toBeVisible();
  await expect(
    page.getByText("Periode: 30-07-2024 s/d 31-07-2024")
  ).toBeVisible();
});
