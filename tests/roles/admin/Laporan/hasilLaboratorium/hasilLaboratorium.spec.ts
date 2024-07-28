// import { test, expect } from "@playwright/test";

// test.describe("Hasil Laboratorium", () => {
//   test.use({ storageState: "tests/auth/roles/admin.json" });
//   test.beforeEach(async ({ page }) => {
//     await page.goto("/MedicalFacilityDashboard");
//     await page.waitForLoadState("domcontentloaded");
//   });

//   test.skip("Admin can access and see report Hasil Laboratorium with checked pemeriksaan penunjang", async ({
//     page,
//   }) => {
//     await page.getByRole("button", { name: "Laporan" }).click();
//     await page.locator("a").filter({ hasText: "Hasil Laboratorium" }).click();
//     await expect(
//       page.getByRole("heading", { name: "Hasil Laboratorium" })
//     ).toBeVisible();
//     await page.locator("button:near(.k-input-inner)").nth(0).click();

//     await page.getByRole("button", { name: "July" }).click();
//     await page.getByRole("button", { name: "2024" }).click();
//     await page.getByText("2023", { exact: true }).click();
//     await page.getByText("Jan", { exact: true }).click();
//     await page.getByLabel("Sunday, January 1,").getByText("1").click();
//     await page.getByRole("button", { name: "Pemeriksaan Penunjang" }).click();
//     await page.getByLabel("Hematologi Lengkap").check();
//     await page.getByText("Laboratorium", { exact: true }).click();
//     await page.getByLabel("Albumin", { exact: true }).check();
//     await page.getByRole("button", { name: "Pilih" }).click();
//     await page.waitForTimeout(10000);
//     await page.getByRole("button", { name: "Lihat" }).click();

//     await page.waitForTimeout(10000);
//     await expect(page.getByText("LAPORAN HASIL LABORATORIUM")).toBeVisible();
//     await expect(
//       page.getByText("Periode: 01-01-2023 s/d 27-07-2024")
//     ).toBeVisible();
//     await expect(
//       page.getByLabel("Report contents area").getByText("Hemoglobin")
//     ).toBeVisible();
//     await expect(
//       page
//         .getByLabel("Report contents area")
//         .locator("div")
//         .filter({ hasText: /^Hemoglobin$/ })
//         .first()
//     ).toBeVisible();
//     await expect(
//       page
//         .locator("div")
//         .filter({ hasText: /^Ayu Dewi$/ })
//         .first()
//     ).toBeVisible();
//   });

//   test.skip("admin can unchecked pemeriksaan penunjang", async ({ page }) => {
//     await page.getByRole("button", { name: "Laporan" }).click();
//     await page.locator("a").filter({ hasText: "Hasil Laboratorium" }).click();
//     await expect(
//       page.getByRole("heading", { name: "Hasil Laboratorium" })
//     ).toBeVisible();
//     await page.locator("button:near(.k-input-inner)").nth(0).click();

//     await page.getByRole("button", { name: "July" }).click();
//     await page.getByRole("button", { name: "2024" }).click();
//     await page.getByText("2023", { exact: true }).click();
//     await page.getByText("Jan", { exact: true }).click();
//     await page.getByLabel("Sunday, January 1,").getByText("1").click();
//     await page.getByRole("button", { name: "Pemeriksaan Penunjang" }).click();
//     await page.getByLabel("Hematologi Lengkap").check();
//     await page.getByText("Laboratorium", { exact: true }).click();
//     await page.getByLabel("Albumin", { exact: true }).check();
//     await page.getByRole("button", { name: "Pilih" }).click();

//     await page.waitForTimeout(10000);

//     await page.getByRole("button", { name: "Lihat" }).click();
//     await page.waitForTimeout(10000);
//     await expect(page.getByText("LAPORAN HASIL LABORATORIUM")).toBeVisible();
//     await expect(
//       page.getByText("Periode: 01-01-2023 s/d 27-07-2024")
//     ).toBeVisible();
//     await expect(
//       page.getByLabel("Report contents area").getByText("Hemoglobin")
//     ).toBeVisible();
//     await expect(
//       page
//         .getByLabel("Report contents area")
//         .locator("div")
//         .filter({ hasText: /^Hemoglobin$/ })
//         .first()
//     ).toBeVisible();
//     await expect(
//       page
//         .locator("div")
//         .filter({ hasText: /^Ayu Dewi$/ })
//         .first()
//     ).toBeVisible();

//     await page.getByRole("button", { name: "Pemeriksaan Penunjang" }).click();
//     await page.getByLabel("Hematologi Lengkap").uncheck();
//     await page.getByText("Laboratorium", { exact: true }).click();
//     await page.getByLabel("Hemoglobin").first().check();
//     await page.getByLabel("Leukosit").first().check();
//     await page.getByRole("button", { name: "Pilih" }).click();
//     await page.waitForTimeout(10000);

//     await expect(
//       page
//         .locator("div")
//         .filter({ hasText: /^Albumin$/ })
//         .nth(3)
//     ).toBeVisible();
//     await expect(
//       page.locator("label").filter({ hasText: "Hemoglobin" })
//     ).toBeVisible();
//     await expect(
//       page.locator("label").filter({ hasText: "Leukosit" })
//     ).toBeVisible();

//     await page.getByRole("button", { name: "Lihat" }).click();
//     await page.waitForTimeout(10000);
//     await expect(page.getByText("LAPORAN HASIL LABORATORIUM")).toBeVisible();
//     await expect(
//       page.getByText("Periode: 01-01-2023 s/d 27-07-2024")
//     ).toBeVisible();
//     await page
//       .getByLabel("Report contents area")
//       .locator("div")
//       .filter({ hasText: /^Hemoglobin$/ })
//       .first()
//       .click();
//     await expect(
//       page
//         .getByLabel("Report contents area")
//         .locator("div")
//         .filter({ hasText: /^Hemoglobin$/ })
//         .first()
//     ).toBeVisible();
//     await expect(
//       page
//         .getByLabel("Report contents area")
//         .locator("div")
//         .filter({ hasText: /^Leukosit$/ })
//         .first()
//     ).toBeVisible();
//   });

//   test.skip("admin can search pemeriksaan penunjang", async ({ page }) => {
//     await page.getByRole("button", { name: "Laporan" }).click();
//     await page.locator("a").filter({ hasText: "Hasil Laboratorium" }).click();
//     await expect(
//       page.getByRole("heading", { name: "Hasil Laboratorium" })
//     ).toBeVisible();
//     await page.locator("button:near(.k-input-inner)").nth(0).click();

//     await page.getByRole("button", { name: "July" }).click();
//     await page.getByRole("button", { name: "2024" }).click();
//     await page.getByText("2023", { exact: true }).click();
//     await page.getByText("Jan", { exact: true }).click();
//     await page.getByLabel("Sunday, January 1,").getByText("1").click();
//     await page.getByRole("button", { name: "Pemeriksaan Penunjang" }).click();
//     await page.getByText("Laboratorium", { exact: true }).click();
//     await page.getByPlaceholder("Cari Lab").click();
//     await page.getByPlaceholder("Cari Lab").fill("hemoglobin");

//     await page.waitForTimeout(10000);
//     await expect(page.getByText("Hemoglobin").first()).toBeVisible();

//     await page.getByLabel("Hemoglobin").first().check();
//     await page.getByRole("button", { name: "Pilih" }).click();
//     await page.waitForTimeout(10000);

//     await page.getByRole("button", { name: "Lihat" }).click();
//     await page.waitForTimeout(10000);
//     await expect(page.getByText("LAPORAN HASIL LABORATORIUM")).toBeVisible();
//     await expect(
//       page.getByText("Periode: 01-01-2023 s/d 27-07-2024")
//     ).toBeVisible();
//     await expect(
//       page
//         .getByLabel("Report contents area")
//         .locator("div")
//         .filter({ hasText: /^Hemoglobin$/ })
//         .first()
//     ).toBeVisible();
//     await expect(page.getByText("Ayu Dewi")).toBeVisible();
//   });
// });
