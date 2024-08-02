import { test, expect } from "@playwright/test";

test.describe.serial("Ruang Operasi", () => {
  test.use({ storageState: "tests/auth/roles/admin.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("/MedicalFacilityDashboard");
    await page.waitForLoadState("load");
    await page.reload();
    await page.getByRole("button", { name: "Administrasi" }).click();
    await page
      .getByRole("button", { name: "Pengaturan PraktikPengaturan" })
      .click();
    await page
      .locator("a")
      .filter({ hasText: /^Ruang Operasi$/ })
      .click();
    await expect(
      page.getByRole("heading", { name: "Ruang Operasi" })
    ).toBeVisible();
  });

  test("admin can't add room without input form", async ({ page }) => {
    await page.getByRole("button", { name: "Tambah" }).click();
    await page.getByRole("button", { name: "Simpan" }).click();
    await expect(page.getByText("Nama ruangan harus diisi")).toBeVisible();
    await page.getByRole("button", { name: "OK" }).click();
  });

  test("admin can add surgery room", async ({ page }) => {
    await page.getByRole("button", { name: "Tambah" }).click();
    await page.getByRole("textbox").click();
    await page.getByRole("textbox").fill("Ruang Operasi 4");
    await page.getByRole("button", { name: "Simpan" }).click();
    await expect(
      page.getByRole("gridcell", { name: "Ruang Operasi 4" })
    ).toBeVisible();
  });

  test("admin can't add surgery room with same name", async ({ page }) => {
    await page.getByRole("button", { name: "Tambah" }).click();
    await page.getByRole("textbox").click();
    await page.getByRole("textbox").fill("Ruang Operasi 4");
    await page.getByRole("button", { name: "Simpan" }).click();
    await expect(page.getByText("Nama ruangan sudah ada")).toBeVisible();
    await page.getByRole("button", { name: "OK" }).click();
  });

  test("admin can edit surgery room", async ({ page }) => {
    await page
      .getByRole("row", { name: "Ruang Operasi 4" })
      .getByRole("button")
      .click();
    await page.getByRole("textbox").click();
    await page.getByRole("textbox").fill("Ruang Operasi 4 update");
    await page.getByRole("button", { name: "Simpan" }).click();
    await expect(
      page.getByRole("gridcell", { name: "Ruang Operasi 4 update" })
    ).toBeVisible();
  });
});
