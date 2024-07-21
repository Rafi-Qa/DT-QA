import { test as setup, expect } from "@playwright/test";
import { URL, ID } from "../tests/helper/setupConfig";

const [appIdText, appIdPassword] = ID.split(" - ");

setup("Initial setup", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Mulai" }).click();
  await page.getByPlaceholder("Alamat URL").click();
  await page.getByPlaceholder("Alamat URL").fill(URL);
  await page.locator("#tbappId_text").click();
  if (appIdText && appIdPassword) {
    await page.locator("#tbappId_text").fill(appIdText);
    await page.locator("#tbappId_Password").fill(appIdPassword);
  }
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
