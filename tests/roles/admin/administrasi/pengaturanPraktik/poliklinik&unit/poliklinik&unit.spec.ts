import { test, expect } from "@playwright/test";

test.describe.serial("Poliklinik & Unit", () => {
  test.use({ storageState: "tests/auth/roles/admin.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("/MedicalFacilityDashboard");
    await page.waitForLoadState("load");
    await page.reload();
    await page.getByRole("button", { name: "Administrasi" }).click();
    await page.getByRole("button", { name: "Pengaturan Praktik" }).click();
    await page.locator("a").filter({ hasText: "Poliklinik dan Unit" }).click();
    await expect(
      page.getByRole("heading", { name: "Master Poliklinik" })
    ).toBeVisible();
  });

  test("Admin can add poliklink and unit", async ({ page }) => {
    await page.getByRole("button", { name: "Tambah" }).click();
    // Input Poli
    await page.locator("#TxtPliclinicName").click();
    await page.locator("#TxtPliclinicName").fill("Testing Poli 1");
    await page.locator("#TxtQueueCode").click();
    await page.locator("#TxtQueueCode").fill("TP");
    await page.getByLabel("Open").click();
    await page.getByRole("option", { name: "​POLI GIGI & MULUT" }).click();
    await page.getByRole("button", { name: "Simpan" }).click();

    // assertion
    await expect(page).toHaveURL(
      "/Administration/PengaturanPraktik/PolyclinicAndUnit"
    );
    await expect(page.getByText("Poliklinik/Unit berhasil")).toBeVisible();

    await page.getByRole("button", { name: "OK" }).click();
  });

  test("admin can't add poliklinik and unit with same name", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Tambah" }).click();
    // Input Poli
    await page.locator("#TxtPliclinicName").click();
    await page.locator("#TxtPliclinicName").fill("Testing Poli 1");
    await page.locator("#TxtQueueCode").click();
    await page.locator("#TxtQueueCode").fill("TP");
    await page.getByLabel("Open").click();
    await page.getByRole("option", { name: "​POLI GIGI & MULUT" }).click();
    await page.getByRole("button", { name: "Simpan" }).click();

    // assertion
    await expect(page).toHaveURL(
      "/Administration/PengaturanPraktik/PolyclinicAndUnit"
    );
    await expect(
      page.getByText(
        "Gagal untuk menambahkan poliklinik. Nama poliklinik sudah ada."
      )
    ).toBeVisible();

    await page.getByRole("button", { name: "OK" }).click();
  });

  test.skip("admin can't add poliklinik and unit without input data", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Tambah" }).click();
    await page.getByRole("button", { name: "Simpan" }).click();

    // assertion
    await page.waitForTimeout(2000);
    await expect(page.locator("#TxtPliclinicName")).toHaveClass(".k-invalid");
    await expect(page.locator("#TxtQueueCode")).toHaveClass(".k-invalid");
  });

  test("admin can edit poliklinik and unit", async ({ page }) => {
    await page.getByRole("button", { name: "Go to the last page" }).click();
    await page.evaluate(() => window.scrollBy(0, 250));
    await page
      .getByRole("row", { name: "Rehabilitasi Medik RM AKP" })
      .getByRole("button")
      .click();

    await page.locator("#TxtPliclinicName").click();
    await page.locator("#TxtPliclinicName").fill("Rehabilitasi Medik update");
    await page.getByRole("button", { name: "Simpan" }).click();
    await expect(
      page.getByText("Poliklinik/Unit berhasil diubah")
    ).toBeVisible();
    await page.getByRole("button", { name: "OK" }).click();
    await expect(
      page.getByRole("gridcell", { name: "Rehabilitasi Medik update" })
    ).toBeVisible();
  });
});
