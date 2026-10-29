import 'dotenv/config';
import { After, Before, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

setDefaultTimeout(30000);

Before(async function () {
  this.browser = await chromium.launch({ headless: process.env.HEADLESS !== 'false' });
  this.context = await this.browser.newContext({
    baseURL: this.automationURL,
    viewport: { width: 1440, height: 1000 },
  });
  this.page = await this.context.newPage();
  this.page.setDefaultTimeout(15000);
});

After({ timeout: 60000 }, async function (scenario) {
  if (scenario?.result?.status === Status.FAILED && this.page) {
    await mkdir('results/screenshots', { recursive: true });
    await this.page
      .screenshot({ path: `results/screenshots/${Date.now()}-falha.png`, fullPage: true })
      .catch(() => {});
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
