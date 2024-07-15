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

    await expect(
      page.getByText("Laporan Penyebaran Pasien Berdasarkan Jenis Kelamin")
    ).toBeVisible();
  });
  // Positive scenarios
  test.only("The receptionist wants to see all participants based on their age range", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Laporan" }).click();
    await page.locator("#dv_81001 a").click();
    await page.getByRole("checkbox").uncheck();
    await page.getByRole("spinbutton").nth(1).click();
    await page.getByRole("spinbutton").nth(1).press("ControlOrMeta+a");
    await page.getByRole("spinbutton").nth(1).fill("20");
    await page.getByRole("button", { name: "Lihat" }).click();
    await page.getByText("Usia: 0 - 20 tahun").click();

    // Asserts
    await expect(
      page.getByText("Laporan Penyebaran Pasien Berdasarkan Jenis Kelamin")
    ).toBeVisible();
    await expect(page.getByText("Usia: 0 - 20 tahun")).toBeVisible();
  });
  // Negatif scenarios
  test("The receptionist wants to see participants without inputting their ages.", async ({
    page,
  }) => {});
});
