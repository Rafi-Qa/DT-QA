import { test, expect } from "@playwright/test";

test.describe("Dashboard Owner", async () => {
  test.use({ storageState: "tests/auth/roles/doctor.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("/OwnerDashboard");
    await expect(page).toHaveURL("/");
    await page.reload();
  });

  test("Doctor can access dashboard and see report medical facility", async ({
    page,
  }) => {
    await expect(page.getByText("Dashboard Pemilik/Penanggung")).toBeVisible({
      timeout: 30000,
    });

    await page.locator("button:near(.k-input-inner)").nth(1).click();
    await page
      .getByRole("button", { name: "Go to the previous period" })
      .click({ clickCount: 2 });

    await page.getByLabel("Wednesday, May 1,").getByText("1").click();
    await page.getByRole("button", { name: "Lihat" }).click();
  });

  test("Doctor can see revenue detail medical facility", async ({ page }) => {
    await page.locator("#myBtn").click();
    await expect(page.getByText("Detail Pemasukan")).toBeVisible();
    await page.locator("#closeBtn").click();
  });

  test("Doctor can see expenses detail medical facility", async ({ page }) => {
    await page.getByRole("button", { name: "Detail" }).nth(1).click();
    await page.getByText("Detail Pengeluaran").click();
    await page.locator("#closeBtn2").click();
  });
});
