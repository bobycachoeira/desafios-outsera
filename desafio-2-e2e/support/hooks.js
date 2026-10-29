import 'dotenv/config';
import { After, Before, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

setDefaultTimeout(60000);

Before(async function () {
  this.browser = await chromium.launch({ headless: process.env.HEADLESS !== 'false' });
  this.context = await this.browser.newContext({
    baseURL: this.automationURL,
    viewport: { width: 1440, height: 1000 },
  });
  this.page = await this.context.newPage();
  this.page.setDefaultTimeout(30000);
});

After({ timeout: 90000 }, async function (scenario) {
  if (this.page) {
    const name = (scenario?.pickle?.name || 'cenario')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-');
    const image = await this.page.screenshot({ fullPage: true }).catch(() => null);

    if (image) {
      await mkdir('results/screenshots', { recursive: true });
      await writeFile(`results/screenshots/${Date.now()}-${name}.png`, image);
      await this.attach(image, 'image/png');
    }
  }

  await this.context?.close();
  await this.browser?.close();

  for (const { email, password } of this.automationUsersToDelete) {
    await fetch(`${this.automationURL}/api/deleteAccount`, {
      method: 'DELETE',
      body: new URLSearchParams({ email, password }),
      signal: AbortSignal.timeout(10000),
    }).catch(() => {});
  }
});
