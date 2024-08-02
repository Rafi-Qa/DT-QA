import { test, expect } from "@playwright/test";

test.use({ storageState: "tests/auth/roles/admin.json" });
test.beforeEach(async ({ page }) => {
  await page.goto("/MedicalFacilityDashboard");
  await page.waitForLoadState("load");
  await page.reload();
  await page.getByRole("button", { name: "Administrasi" }).click();
  await page.getByRole("button", { name: "Pengaturan Praktik" }).click();
  await page.getByRole("button", { name: "Paket Obat" }).click();
  await page.locator("#dv_121101 a").click();
  await expect(page.getByRole("heading", { name: "Paket Obat" })).toBeVisible();
});

test("admin can edit package medicines", async ({ page }) => {
  await page.getByRole("button", { name: "Go to the last page" }).click();
  //   await page
  //     .getByLabel("Data table")
  //     .locator("div")
  //     .evaluate((e) => (e.scrollLeft += 300));

  await page.getByRole("textbox").first().click();
  await page.getByRole("textbox").first().fill("Test update");
  await page.getByRole("button", { name: "Ubah" }).nth(3).click();
  await expect(page.getByRole("strong").getByText("Resep")).toBeVisible();
  await page
    .getByRole("row", { name: "Open Open 0 Increase value" })
    .getByRole("combobox")
    .first()
    .fill("paracetam");
  await page
    .getByRole("option", { name: "​PARACETAMOL TABLET 500 MG" })
    .locator("span")
    .click();
  await page
    .getByRole("gridcell", { name: "Open", exact: true })
    .getByPlaceholder("Petunujuk pemakaian...")
    .click();
  await page
    .getByRole("gridcell", { name: "Open", exact: true })
    .getByPlaceholder("Petunujuk pemakaian...")
    .fill("1");
  await page
    .getByRole("option", { name: "​1 X 1 per hari Sesudah Makan" })
    .click();
  await page
    .getByRole("gridcell", { name: "0 Increase value Decrease" })
    .getByLabel("Increase value")
    .click({ clickCount: 3 });
  await page.getByRole("button", { name: "Simpan" }).click();
  await expect(page.getByText("Data berhasil diupdate!")).toBeVisible();
  await page.getByRole("button", { name: "OK" }).click();
  await expect(
    page.getByRole("gridcell", {
      name: "AMOXICILLIN TRIHYDRATE KAPLET 500 MG,testing,PARACETAMOL TABLET 500 MG ",
    })
  ).toBeVisible();
});
