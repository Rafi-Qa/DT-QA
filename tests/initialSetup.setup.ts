import { test as setup, expect } from "@playwright/test";

setup("Initial setup", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Mulai" }).click();
  await page.getByPlaceholder("Alamat URL").click();
  await page.getByPlaceholder("Alamat URL").fill("srv-staging");
  await page.locator("#tbappId_text").click();
  await page.locator("#tbappId_text").press("CapsLock");
  await page.locator("#tbappId_text").fill("ABCD");
  await page.locator("#tbappId_Password").fill("1234");
  await page.getByRole("button", { name: "Simpan" }).click();

  // Asserts
  await page.waitForSelector('role=heading[name="Selamat Datang,"]', {
    state: "attached",
  });
  await expect(
    page.getByRole("heading", { name: "Selamat Datang," })
  ).toBeVisible();

  // Save state
  await page.context().storageState({ path: "initialSetup.json" });
});
