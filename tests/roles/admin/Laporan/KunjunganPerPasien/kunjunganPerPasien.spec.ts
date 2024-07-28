import { test, expect } from "@playwright/test";

test.describe("Kunjungan Per Pasien", () => {
  test.use({ storageState: "tests/auth/roles/admin.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("/MedicalFacilityDashboard");
    await page.waitForLoadState("load");
    await page.reload();
  });
  test("Admin can access and see report Kunjungan Per Pasien", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Laporan" }).click();
    await page.locator("a").filter({ hasText: "Kunjungan Per Pasien" }).click();
    await expect(
      page.getByRole("heading", { name: "Kunjungan Per Pasien" })
    ).toBeVisible();
    await page.locator("button:near(.k-input-inner)").nth(0).click();

    await page.getByRole("button", { name: "June" }).click();
    await page.getByRole("button", { name: "2024" }).click();
    await page.getByText("2023", { exact: true }).click();
    await page.getByText("Jan").click();
    await page.getByLabel("Sunday, January 1,").getByText("1").click();
    await page.getByRole("button", { name: "Lihat" }).click();
    await expect(page.getByText("Laporan Kunjungan Per Pasien")).toBeVisible();
    await expect(
      page.getByText("Periode: 01-01-2023 s/d 30-06-2024")
    ).toBeVisible();
    await expect(page.getByText("Poli Umum")).toBeVisible();
    await expect(page.getByLabel("Report contents area")).toContainText(
      "Septu"
    );
  });
});
