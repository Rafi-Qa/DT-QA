import { test, expect } from "@playwright/test";

test.describe("Admin can access", () => {
  test.use({ storageState: "tests/auth/roles/admin.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("/MedicalFacilityDashboard");
    await page.waitForLoadState("networkidle");
  });

  test("Admin can report Kunjungan Per Dokter", async ({ page }) => {
    await page.getByRole("button", { name: "Laporan" }).click();
    await page.locator("a").filter({ hasText: "Kunjungan Per Dokter" }).click();

    await page.locator("button:near(.k-input-inner)").nth(0).click();

    await page.getByRole("button", { name: "June" }).click();
    await page.getByRole("button", { name: "2024" }).click();
    await page.getByText("2023", { exact: true }).click();
    await page.getByText("Jan").click();
    await page.getByLabel("Sunday, January 1,").getByText("1").click();
    await page.getByRole("button", { name: "Lihat" }).click();

    await expect(page.getByText("Laporan Kunjungan Per Dokter")).toBeVisible();
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^dr\. Susi$/ })
        .first()
    ).toBeVisible();
  });
});
