import { test, expect } from "@playwright/test";
//! diperbaiki lagi nanti
test.use({ storageState: "tests/auth/roles/admin.json" });
test.beforeEach(async ({ page }) => {
  await page.goto("/MedicalFacilityDashboard");
  await page.waitForLoadState("load");
  await page.reload();
});

test("admin can access and see report kasir", async ({ page }) => {
  await page.getByRole("button", { name: "Laporan" }).click();
  await page
    .locator("a")
    .filter({ hasText: /^Kasir$/ })
    .click();
  await expect(page.getByRole("heading", { name: "Kasir" })).toBeVisible();

  await page.getByRole("button", { name: "Lihat" }).click();
  await expect(page.getByText("Laporan Kasir")).toBeVisible();
  await expect(page.getByText("Periode: 01-06-2024 s/d 30-06-")).toBeVisible();
});
