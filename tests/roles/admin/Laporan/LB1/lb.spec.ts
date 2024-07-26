import { test, expect } from "@playwright/test";

test.describe("Admin can access and see report LB1", () => {
  test.use({ storageState: "tests/auth/roles/admin.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("/MedicalFacilityDashboard");
    // await page.waitForLoadState("networkidle");
  });
  test("Admin can see report LB1", async ({ page }) => {
    await page.getByRole("button", { name: "Laporan" }).click();
    await page.locator("a").filter({ hasText: "LB1" }).click();
    await page.locator("button:near(.k-input-inner)").nth(1).click();

    await page.getByRole("button", { name: "June" }).click();
    await page.getByRole("button", { name: "2024" }).click();
    await page.getByText("2023", { exact: true }).click();
    await page.getByText("Jan").click();
    await page.getByLabel("Sunday, January 1,").getByText("1").click();
    await page.getByRole("button", { name: "Lihat" }).click();

    await page
      .getByLabel("Report contents area")
      .getByText("Laporan Bulanan Data")
      .click();
  });

  // test("Admin cannot see report LB1 with invalid date", async ({ page }) => {
  //   await page.goto("/"); // Pastikan halaman awal diakses terlebih dahulu
  //   await page.getByRole("button", { name: "Laporan" }).click();
  //   await page.locator("a").filter({ hasText: "LB1" }).click();
  //   await page.locator("button:near(.k-input-inner)").nth(1).click();

  //   // Misalnya, mencoba memilih bulan yang tidak valid atau tidak tersedia
  //   await page.getByRole("button", { name: "June" }).click();
  //   await page.getByRole("button", { name: "2024" }).click();
  //   // Memilih tahun yang tidak valid atau tidak tersedia
  //   await page.getByText("2025", { exact: true }).click(); // Tahun ini mungkin tidak ada
  //   // Memilih bulan yang tidak valid atau tidak tersedia
  //   await page.getByText("Feb").click(); // Bulan ini mungkin tidak tersedia dalam konteks
  //   // Memilih tanggal yang tidak valid atau tidak tersedia
  //   await page.getByLabel("Monday, February 30,").getByText("30").click(); // Tanggal ini tidak valid

  //   // Coba klik tombol "Lihat" dengan tanggal yang tidak valid
  //   await page.getByRole("button", { name: "Lihat" }).click();

  //   // Asserts
  //   // Memastikan pesan error muncul atau laporan tidak terlihat
  //   await expect(
  //     page.getByLabel("Report contents area").getByText("Laporan Bulanan Data")
  //   ).not.toBeVisible();
  //   await expect(page.getByText("Error: Invalid date selected")).toBeVisible();
  // });

  // test("Admin cannot see report LB1 without selecting a date", async ({
  //   page,
  // }) => {
  //   await page.goto("/"); // Pastikan halaman awal diakses terlebih dahulu
  //   await page.getByRole("button", { name: "Laporan" }).click();
  //   await page.locator("a").filter({ hasText: "LB1" }).click();
  //   await page.locator("button:near(.k-input-inner)").nth(1).click();

  //   // Admin tidak memilih bulan, tahun, dan tanggal

  //   // Coba klik tombol "Lihat" tanpa memilih tanggal
  //   await page.getByRole("button", { name: "Lihat" }).click();

  //   // Asserts
  //   // Memastikan pesan error muncul atau laporan tidak terlihat
  //   await expect(
  //     page.getByLabel("Report contents area").getByText("Laporan Bulanan Data")
  //   ).not.toBeVisible();
  //   await expect(
  //     page.getByText("Error: Date selection required")
  //   ).toBeVisible();
  // });
});
