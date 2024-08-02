import { test, expect } from "@playwright/test";

test("admin can access and see report 10 diagnosis terbanyak", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Laporan" }).click();
  await page.locator("a").filter({ hasText: "Diagnosis Terbanyak" }).click();
  await expect(
    page.getByRole("heading", { name: "Diagnosis Terbanyak" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Lihat" }).click();
  await expect(
    page.getByLabel("Report contents area").getByText("Diagnosis Terbanyak")
  ).toBeVisible();
  await expect(
    page.getByText("Periode: 01-01-2024 s/d 02-08-2024")
  ).toBeVisible();

  const headers = ["Nama", "Total"];

  for (const header of headers) {
    await expect(
      page
        .locator("div")
        .filter({ hasText: new RegExp(`^${header}$`) })
        .first()
    ).toBeVisible();
  }

  const rows = ["R51 Headache", "18"];

  for (const row of rows) {
    await expect(
      page
        .locator("div")
        .filter({ hasText: new RegExp(`^${row}$`) })
        .first()
    ).toBeVisible();
  }
});
