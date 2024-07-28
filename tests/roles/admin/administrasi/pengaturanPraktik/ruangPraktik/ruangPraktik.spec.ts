import { test, expect } from "@playwright/test";

test.describe.serial("Ruang Praktik", () => {
  test.use({ storageState: "tests/auth/roles/admin.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("/MedicalFacilityDashboard");
    await page.waitForLoadState("load");
    await page.reload();
  });
  test("Admin can add practice room", async ({ page }) => {
    await page.getByRole("button", { name: "Administrasi" }).click();
    await page.getByRole("button", { name: "Pengaturan Praktik" }).click();
    await page.locator("a").filter({ hasText: "Ruang Praktik" }).click();
    await page.getByRole("button", { name: "Tambah" }).click();

    // Input Poli
    await page.locator("#roomName").click();
    await page.locator("#roomName").fill("POLI UMUM 4");
    await page.getByLabel("Open").click();
    await page.getByRole("option", { name: "​Umum" }).click();

    await page.getByRole("button", { name: "Simpan" }).click();
    await page.getByRole("button", { name: "Go to the last page" }).click();
    await page.getByRole("gridcell", { name: "POLI UMUM 4" }).click();

    // assertion
    await expect(
      page.getByRole("gridcell", { name: "POLI UMUM 4" })
    ).toBeVisible();
  });

  test("admin can't add practice room with same name", async ({ page }) => {
    await page.getByRole("button", { name: "Administrasi" }).click();
    await page.getByRole("button", { name: "Pengaturan Praktik" }).click();
    await page.locator("a").filter({ hasText: "Ruang Praktik" }).click();
    await page.getByRole("button", { name: "Tambah" }).click();

    // Input Poli
    await page.locator("#roomName").click();
    await page.locator("#roomName").fill("POLI UMUM 4");
    await page.getByLabel("Open").click();
    await page.getByRole("option", { name: "​Umum" }).click();

    await page.getByRole("button", { name: "Simpan" }).click();
    await expect(page.getByText("Ruang Praktik sudah ada.")).toBeVisible();
    await page.getByRole("button", { name: "OK" }).click();
  });

  test("admin can't add practice room without input form", async ({ page }) => {
    await page.getByRole("button", { name: "Administrasi" }).click();
    await page.getByRole("button", { name: "Pengaturan Praktik" }).click();
    await page.locator("a").filter({ hasText: "Ruang Praktik" }).click();
    await expect(
      page.getByRole("heading", { name: "Ruang Praktik" })
    ).toBeVisible();
    await page.getByRole("button", { name: "Tambah" }).click();
    await page
      .getByRole("button", { name: "Simpan" })
      .click({ noWaitAfter: true });
    await expect(
      page.getByText("Gagal menambahkan data. Mohon coba kembali.")
    ).toBeVisible();
    await page.getByRole("button", { name: "OK" }).click();
  });

  test.skip("admin can edit practice room", async ({ page }) => {
    await page.getByRole("button", { name: "Administrasi" }).click();
    await page.getByRole("button", { name: "Pengaturan Praktik" }).click();
    await page.locator("a").filter({ hasText: "Ruang Praktik" }).click();
    await expect(
      page.getByRole("heading", { name: "Ruang Praktik" })
    ).toBeVisible();
    await page.getByRole("button", { name: "Go to the last page" }).click();
    await page.getByRole("button", { name: "Ubah" }).nth(2).click();
    await page.locator("#roomName").click();
    await page.locator("#roomName").fill("POLI UMUM 4 update");
    await page.getByRole("button", { name: "Simpan" }).click();
  });

  test("admin can delete practice room", async ({ page }) => {
    await page.getByRole("button", { name: "Administrasi" }).click();
    await page.getByRole("button", { name: "Pengaturan Praktik" }).click();
    await page.locator("a").filter({ hasText: "Ruang Praktik" }).click();
    await expect(
      page.getByRole("heading", { name: "Ruang Praktik" })
    ).toBeVisible();

    await page.getByRole("button", { name: "Go to the last page" }).click();
    await page.getByRole("button", { name: "Hapus" }).nth(2).click();
    await expect(
      page.getByText("Apakah Anda ingin menghapus data ruangan?")
    ).toBeVisible();
    await page.getByRole("button", { name: "OK" }).click();
    await expect(
      page.getByText("Ruang Praktik berhasil dihapus")
    ).toBeVisible();
    await page.getByRole("button", { name: "OK" }).click();
  });
});
