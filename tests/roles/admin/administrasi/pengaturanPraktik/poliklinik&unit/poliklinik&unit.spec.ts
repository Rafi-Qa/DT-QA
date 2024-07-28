import { test, expect } from "@playwright/test";

test.describe("Admin can access poliklinik", () => {
  test.use({ storageState: "tests/auth/roles/admin.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("/MedicalFacilityDashboard");
    await page.waitForLoadState("load");
    await page.reload();
  });

  test.skip("Admin can added poliklink and unit", async ({ page }) => {
    await page.getByRole("button", { name: "Administrasi" }).click();
    await page.getByRole("button", { name: "Pengaturan Praktik" }).click();
    await page.locator("a").filter({ hasText: "Poliklinik dan Unit" }).click();
    await page.getByRole("heading", { name: "Master Poliklinik" }).click();
    await page.getByRole("button", { name: "Tambah" }).click();

    // Input Poli
    await page.locator("#TxtPliclinicName").click();
    await page.locator("#TxtPliclinicName").fill("Rehabilitasi Medik");
    await page.locator("#TxtQueueCode").click();
    await page.locator("#TxtQueueCode").fill("RM");
    // await page.locator("#poli-v-claim-select_selectId span").click();
    // await page.getByRole("option", { name: "​ AKUPUNTUR MEDIK" }).click();
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
    await page.getByRole("button", { name: "Administrasi" }).click();
    await page.getByRole("button", { name: "Pengaturan Praktik" }).click();
    await page.locator("a").filter({ hasText: "Poliklinik dan Unit" }).click();
    await page.getByRole("heading", { name: "Master Poliklinik" }).click();
    await page.getByRole("button", { name: "Tambah" }).click();

    // Input Poli
    await page.locator("#TxtPliclinicName").click();
    await page.locator("#TxtPliclinicName").fill("Rehabilitasi Medik");
    await page.locator("#TxtQueueCode").click();
    await page.locator("#TxtQueueCode").fill("RM");
    // await page.locator("#poli-v-claim-select_selectId span").click();
    // await page.getByRole("option", { name: "​ AKUPUNTUR MEDIK" }).click();
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

  test("admin can't add poliklinik and unit without input data", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Administrasi" }).click();
    await page.getByRole("button", { name: "Pengaturan Praktik" }).click();
    await page.locator("a").filter({ hasText: "Poliklinik dan Unit" }).click();

    await expect(
      page.getByRole("heading", { name: "Master Poliklinik" })
    ).toBeVisible();

    await page.getByRole("button", { name: "Tambah" }).click();
    await page.getByRole("button", { name: "Simpan" }).click();

    await page.waitForTimeout(2000);
    // await page.locator("#TxtPliclinicName").first().hover();
    await page.hover("#TxtPliclinicName", { force: true });
    await expect(page.getByText("Name should not be empty")).toBeVisible();
    await page.hover("#TxtQueueCode");
    await expect(
      page.getByText("Queue Code should not be empty")
    ).toBeVisible();
    await expect(page).toHaveURL(
      "/Administration/PengaturanPraktik/PolyclinicAndUnit"
    );
  });

  test("admin can edit poliklinik and unit", async ({ page }) => {
    await page.getByRole("button", { name: "Administrasi" }).click();
    await page
      .getByRole("button", { name: "Pengaturan PraktikPengaturan" })
      .click();
    await page.locator("a").filter({ hasText: "Poliklinik dan Unit" }).click();
    await expect(
      page.getByRole("heading", { name: "Master Poliklinik" })
    ).toBeVisible();
    await page.getByRole("button", { name: "Go to the last page" }).click();
    await page
      .getByRole("row", { name: "Rehabilitasi Medik RM AKP" })
      .getByRole("button")
      .click();
    await page.locator("#TxtPliclinicName").click();
    await page.locator("#TxtPliclinicName").fill("Rehabilitasi Medik update");
    await page.getByRole("button", { name: "Simpan" }).click();
    await expect(page.getByText("Poliklinik/Unit berhasil")).toBeVisible();
    await page.getByRole("button", { name: "OK" }).click();
    await expect(
      page.getByRole("gridcell", { name: "Rehabilitasi Medik update" })
    ).toBeVisible();
  });
});
