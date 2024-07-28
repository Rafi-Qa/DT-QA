import { test, expect } from "@playwright/test";

test.describe("Penggunaan Produk", () => {
  test.use({ storageState: "tests/auth/roles/admin.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("/MedicalFacilityDashboard");
    await page.waitForLoadState("networkidle");
  });

  test("admin can access and see report penggunaan produk", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Laporan" }).click();
    await page.locator("a").filter({ hasText: "Penggunaan Produk" }).click();
    await expect(
      page.getByRole("heading", { name: "Penggunaan Produk" })
    ).toBeVisible();
    await page.locator("button:near(.k-input-inner)").nth(0).click();

    await page.getByRole("button", { name: "June" }).click();
    await page.getByRole("button", { name: "2024" }).click();
    await page.getByText("2023", { exact: true }).click();
    await page.getByText("Jan").click();
    await page.getByLabel("Sunday, January 1,").getByText("1").click();
    await page.getByRole("button", { name: "Lihat" }).click();

    await expect(page.getByText("Laporan Penggunaan Produk per")).toBeVisible();
    await expect(
      page.getByText("Periode: 01-01-2023 s/d 30-06-2024")
    ).toBeVisible();
    await expect(
      page.getByText("AMBROXOL HCL SIRUP 15 MG/ 5 ML")
    ).toBeVisible();
  });
});
