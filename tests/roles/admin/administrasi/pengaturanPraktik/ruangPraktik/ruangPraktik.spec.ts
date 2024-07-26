import { test, expect } from "@playwright/test";

test.describe("Admin can access ruangPraktik", () => {
  test.use({ storageState: "tests/auth/roles/admin.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("/MedicalFacilityDashboard");
  });
  test("Admin can add practice room", async ({ page }) => {
    await page.getByRole("button", { name: "Administrasi" }).click();
    await page.getByRole("button", { name: "Pengaturan Praktik" }).click();
    await page.locator("a").filter({ hasText: "Ruang Praktik" }).click();
    await page.getByRole("button", { name: "Tambah" }).click();

    // Input Poli
    await page.locator("#roomName").click();
    await page.locator("#roomName").fill("Poli umum 4");
    await page.getByLabel("Open").click();
    await page.getByRole("option", { name: "​Umum" }).click();

    await page.getByRole("button", { name: "Simpan" }).click();
    await page.getByRole("button", { name: "Go to the last page" }).click();
    await page.getByRole("gridcell", { name: "Poli umum 4" }).click();

    // assertion
    await expect(
      page.getByRole("gridcell", { name: "Poli umum 4" })
    ).toBeVisible();
  });
});
