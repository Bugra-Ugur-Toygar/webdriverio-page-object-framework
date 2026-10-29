import { $$, browser } from '@wdio/globals';
import { ROUTES } from '../data/shop.data.js';
import AppPage from './app.page.js';

class FavoritesPage extends AppPage {
  constructor() {
    super(ROUTES.favorites);
  }

  get productNames() {
    return $$('[data-test="product-name"]');
  }

  async getProductNames() {
    await this.waitForHeading();
    await browser.waitUntil(async () => (await this.readProductNames()).length > 0);
    return this.readProductNames();
  }

  async readProductNames() {
    const names = await this.productNames.map((name) => name.getText());
    return names.map((name) => name.trim());
  }

  async reload() {
    await super.reload();
    await this.waitForHeading();
  }
}

export default new FavoritesPage();
