import { test, expect } from "@playwright/test";

test.describe("Dashboard Dokter", async () => {
  test.use({ storageState: "tests/auth/roles/doctor.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("/OwnerDashboard");
    await expect(page).toHaveURL("/");
    await page.reload();
  });

  test("Doctor can access dashboard and see report", async ({ page }) => {
    await page.getByRole("button", { name: "Home" }).click();
    await page.locator("a").filter({ hasText: "Dashboard Dokter" }).click();
    await expect(
      page.locator("#ddisplayArea").getByText("Dashboard Dokter")
    ).toBeVisible();
    await page.locator("button:near(.k-input-inner)").nth(1).click();
    await page.getByRole("button", { name: "August" }).click();
    await page.getByRole("button", { name: "2024" }).click();
    await page.getByText("2023", { exact: true }).click();
    await page.getByText("Jan", { exact: true }).click();
    await page.getByLabel("Sunday, January 1,").getByText("1").click();
    await page.getByRole("button", { name: "Lihat" }).click();
    await expect(page.getByText("GRAFIK KUNJUNGAN")).toBeVisible();

    // await expect(
    //   page.getByText(
    //     "Rata-Rata Waktu Tunggu 510.85 Menit Rata-Rata Tatap Muka 12.74 Menit Jumlah"
    //   )
    // ).toBeVisible();
  });

  test("Doctor can see data actions", async ({ page }) => {
    await page.getByRole("button", { name: "Home" }).click();
    await page.locator("a").filter({ hasText: "Dashboard Dokter" }).click();
    await expect(
      page.locator("#ddisplayArea").getByText("Dashboard Dokter")
    ).toBeVisible();
    await page.locator("button:near(.k-input-inner)").nth(1).click();
    await page.getByRole("button", { name: "August" }).click();
    await page.getByRole("button", { name: "2024" }).click();
    await page.getByText("2023", { exact: true }).click();
    await page.getByText("Jan", { exact: true }).click();
    await page.getByLabel("Sunday, January 1,").getByText("1").click();
    await page.getByRole("button", { name: "Lihat" }).click();

    await page.evaluate(() => window.scrollBy(0, 300));
    await expect(page.getByText("TINDAKAN", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Apply" }).click();
    await expect(
      page.getByRole("cell", { name: "Coba Tindakan R1" })
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Asuransi Asal Sehat" })
    ).toBeVisible();
  });

  // !Negative Case
  test.skip("Doctor can't see data actions", async ({ page }) => {
    await page.getByRole("button", { name: "Home" }).click();
    await page.locator("a").filter({ hasText: "Dashboard Dokter" }).click();
    await expect(
      page.locator("#ddisplayArea").getByText("Dashboard Dokter")
    ).toBeVisible();
    await page.locator("button:near(.k-input-inner)").nth(1).click();
    await page.getByRole("button", { name: "August" }).click();
    await page.getByRole("button", { name: "2024" }).click();
    await page.getByText("2023", { exact: true }).click();
    await page.getByText("Jan", { exact: true }).click();
    await page.getByLabel("Sunday, January 1,").getByText("1").click();
    await page.getByRole("button", { name: "Lihat" }).click();

    await page.evaluate(() => window.scrollBy(0, 300));
    await page.locator(".k-chip-action > .k-icon").first().click();
    await page.locator(".k-chip-action > .k-icon").nth(1).click();
    await page.locator(".k-chip-action > .k-icon").nth(2).click();
    await page.getByRole("button", { name: "Apply" }).click();
    await page.locator(".k-pivotgrid-empty-cell").click();
  });
});
