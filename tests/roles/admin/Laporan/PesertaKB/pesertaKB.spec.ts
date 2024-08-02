import { test, expect } from "@playwright/test";

test.use({ storageState: "tests/auth/roles/admin.json" });
test.beforeEach(async ({ page }) => {
  await page.goto("/MedicalFacilityDashboard");
  await page.waitForLoadState("load");
  await page.reload();
});

test("admin can access and see report peserta KB", async ({ page }) => {
  await page.getByRole("button", { name: "Laporan" }).click();
  await page.locator("a").filter({ hasText: "Peserta KB" }).click();
  await expect(page.getByRole("heading", { name: "Peserta KB" })).toBeVisible();
  await page.getByRole("button", { name: "Lihat" }).click();
  await expect(
    page.getByText("FORMAT REGISTER KB BARU DAN AKTIF")
  ).toBeVisible();
  await expect(page.locator(".detailSection1")).toBeVisible();
});
