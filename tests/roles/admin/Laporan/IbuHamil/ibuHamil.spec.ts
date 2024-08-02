import { test, expect } from "@playwright/test";

test.use({ storageState: "tests/auth/roles/admin.json" });
test.beforeEach(async ({ page }) => {
  await page.goto("/MedicalFacilityDashboard");
  await page.waitForLoadState("load");
  await page.reload();
});

test("Admin can access and see report ibu hamil", async ({ page }) => {
  await page.getByRole("button", { name: "Laporan" }).click();
  await page.getByRole("button", { name: "Laporan" }).click();
  await page.locator("a").filter({ hasText: "Ibu Hamil" }).click();
  await expect(page.getByRole("heading", { name: "Ibu Hamil" })).toBeVisible();
  await page.getByRole("button", { name: "Lihat" }).click();
  await expect(page.getByText("FORMAT REGISTER IBU HAMIL")).toBeVisible();
  await expect(page.locator(".detailSection1")).toBeVisible();
});
