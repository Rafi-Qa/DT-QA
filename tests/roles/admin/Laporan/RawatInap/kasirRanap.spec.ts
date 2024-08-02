import { test, expect } from "@playwright/test";

test.use({ storageState: "tests/auth/roles/admin.json" });
test.beforeEach(async ({ page }) => {
  await page.goto("/MedicalFacilityDashboard");
  await page.waitForLoadState("load");
  await expect(page).toHaveURL("/");
  await page.reload();
});

test("admin can access and see report kasir rawat inap", async ({ page }) => {
  await page.getByRole("button", { name: "Laporan" }).click();
  await page.getByRole("button", { name: "Rawat Inap" }).click();
  await page
    .locator("a")
    .filter({ hasText: /^Kasir Rawat Inap$/ })
    .click();
  await expect(
    page.getByRole("heading", { name: "Kasir Rawat Inap" })
  ).toBeVisible();

  await page.waitForSelector("button:near(.k-input-inner)", {
    state: "attached",
  });

  await page.locator("button:near(.k-input-inner)").nth(0).click();
  await page.getByRole("button", { name: "August" }).click();
  await page.getByText("Jul").click();
  await page.getByLabel("Monday, July 1,").getByText("1").click();
  await page.getByRole("button", { name: "Lihat" }).click();
  await expect(page.getByText("Laporan Kasir Rawat Inap")).toBeVisible();
  await expect(
    page.getByText("Periode: 01-07-2024 s/d 01-08-2024")
  ).toBeVisible();

  const headers = [
    "5 Jul 2024",
    "5 Jul 24, 13:29",
    "INV-0130967",
    "RM-0010230",
  ];

  for (const header of headers) {
    await expect(page.getByText(header)).toBeVisible();
  }
});
