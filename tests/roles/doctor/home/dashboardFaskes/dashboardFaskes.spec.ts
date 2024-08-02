import { test, expect } from "@playwright/test";

test.describe("Dashboard Owner", async () => {
  test.use({ storageState: "tests/auth/roles/doctor.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("/OwnerDashboard");
    await expect(page).toHaveURL("/");
    await page.reload();
  });

  test("Doctor can access dashboard medical facility and see report", async ({
    page,
  }) => {
    await expect(page.getByText("Dashboard Pemilik/Penanggung")).toBeVisible({
      timeout: 30000,
    });
    await page.getByRole("button", { name: "Home" }).click();
    await page.locator("a").filter({ hasText: "Dashboard Faskes" }).click();
    await expect(page.getByText("Dashboard Fasilitas Kesehatan")).toBeVisible({
      timeout: 30000,
    });
  });

  test.only("Doctor can see 10 Most common diagnoses", async ({ page }) => {
    await expect(page.getByText("Dashboard Pemilik/Penanggung")).toBeVisible({
      timeout: 30000,
    });
    await page.getByRole("button", { name: "Home" }).click();
    await page.locator("a").filter({ hasText: "Dashboard Faskes" }).click();

    await page.evaluate(() => window.scrollBy(0, 300));

    // await page.getByText("10 DIAGNOSIS TERBANYAK").evaluate(() => {
    //   window.scrollBy(0, 300);
    // });

    await expect(
      page.getByText("10 DIAGNOSIS TERBANYAK", { exact: true })
    ).toBeVisible();

    await page.locator("button:near(.k-input-inner)").nth(0).click();
    await page.getByRole("button", { name: "January" }).click();
    await page.getByRole("button", { name: "2024" }).click();
    await page.getByText("2023", { exact: true }).click();
    await page.getByLabel("2023").getByText("Jan").click();
    await page.getByLabel("Sunday, January 1,").getByText("1").click();
    await page.getByRole("button", { name: "Lihat" }).click();
    await expect(
      page.getByRole("gridcell", { name: "A01.0 Typhoid fever" })
    ).toBeVisible();
  });
});
