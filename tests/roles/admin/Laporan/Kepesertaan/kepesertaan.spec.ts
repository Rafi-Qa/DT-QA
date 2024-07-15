import { test, expect } from "@playwright/test";

test.describe("Admin can access and see report Kepesertaan", () => {
  test.use({ storageState: "tests/auth/roles/admin.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("/MedicalFacilityDashboard");
  });

  // Positive scenarios
  test("Admin can see the entire list of participants' ages.", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Laporan" }).click();
    await page.locator("#dv_81001 a").click();
    await page.getByRole("button", { name: "Lihat" }).click();
    await page.waitForTimeout(3000);
    await expect(
      page.getByText("Laporan Penyebaran Pasien Berdasarkan Jenis Kelamin")
    ).toBeVisible();
  });
  // Positive scenarios
  test.only("admin wants to see all participants based on their age range", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Laporan" }).click();
    await page.locator("#dv_81001 a").click();
    await page.waitForSelector('input[type="checkbox"]', { state: "attached" });
    await page.locator('input[type="checkbox"]').uncheck();

    // asserts checkbox to be checked
    await expect(page.locator('input[type="checkbox"]')).toBeChecked();

    await page.waitForSelector("role=spinbutton", { state: "attached" });
    await page.getByRole("spinbutton").nth(1).click();
    await page.getByRole("spinbutton").nth(1).fill("20");
    await page.getByRole("button", { name: "Lihat" }).click();

    await page.waitForTimeout(5000);
    // Asserts
    await expect(
      page.getByText("Laporan Penyebaran Pasien Berdasarkan Jenis Kelamin")
    ).toBeVisible();
    await expect(page.getByText("Usia: 0 - 20 tahun")).toBeVisible();
  });
  // Negatif scenarios
  test("Admin Does Not Input Age and the Input Defaults to 0", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Laporan" }).click();
    await page.locator("#dv_81001 a").click();
    await page.waitForSelector('input[type="checkbox"]', { state: "attached" });
    await page.locator('input[type="checkbox"]').uncheck();

    await page.waitForSelector("role=spinbutton", { state: "attached" });
    await page.getByRole("spinbutton").first().click();
    await page.getByRole("spinbutton").first().fill("");
    await page.getByRole("spinbutton").nth(1).click();
    await page.getByRole("spinbutton").nth(1).fill("");
    await page.getByRole("button", { name: "Lihat" }).click();

    await expect(page.getByRole("spinbutton").first()).toHaveValue("0");
    await expect(page.getByRole("spinbutton").nth(1)).toHaveValue("0");

    // Asserts
    await page.waitForTimeout(3000);
    await expect(
      page.getByText("Laporan Penyebaran Pasien Berdasarkan Jenis Kelamin")
    ).toBeVisible();
    await expect(page.getByText("Usia: 0 - 0 tahun")).toBeVisible();
  });
});
