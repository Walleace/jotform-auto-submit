const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();

  await page.goto("https://submit.jotform.com/250295639333158", { waitUntil: "networkidle2" });

  await page.type('input[name="q3_fullName[first]"]', 'John');
  await page.type('input[name="q3_fullName[last]"]', 'Doe');
  await page.type('input[type="email"]', 'john@example.com');

  const today = new Date().toISOString().split("T")[0];
  await page.evaluate((date) => {
    const input = document.querySelector('input[type=\"date\"]');
    if (input) input.value = date;
  }, today);

  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);
  await browser.close();
})();

