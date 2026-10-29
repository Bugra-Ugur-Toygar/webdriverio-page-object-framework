import { $, $$, browser } from '@wdio/globals';
import { clickWhenClickable, typeInto } from '../../core/utils/actions.js';
import { ROUTES } from '../data/shop.data.js';
import AppPage from './app.page.js';

class HomePage extends AppPage {
  constructor() {
    super(ROUTES.home);
  }

  get searchInput() {
    return $('[data-test="search-query"]');
  }

  get searchButton() {
    return $('[data-test="search-submit"]');
  }

  get searchTerm() {
    return $('[data-test="search-term"]');
  }

  get searchResults() {
    return $('[data-test="search_completed"]');
  }

  get productNames() {
    return $$('[data-test="product-name"]');
  }

  get productCards() {
    return $$('a[data-test^="product-"]');
  }

  async open() {
    await super.open();
    await this.waitForCatalog();
  }

  async waitForCatalog() {
    await browser.waitUntil(async () => (await this.getProductCount()) > 0);
  }

  async getProductNames() {
    const names = await this.productNames.map((name) => name.getText());
    return names
      .map((name) => name.replace(/\s+/g, ' ').trim())
      .filter((name) => name.length > 0);
  }

  async getProductCount() {
    const names = await this.getProductNames();
    return names.length;
  }

  async getSearchTerm() {
    if (!(await this.searchTerm.isExisting())) {
      return '';
    }

    const text = (await this.searchTerm.getText()).trim();
    if (text !== '') {
      return text;
    }

    return String(await this.searchTerm.getProperty('textContent')).trim();
  }

  async searchFor(term) {
    await typeInto(this.searchInput, term);
    await clickWhenClickable(this.searchButton);
    await browser.waitUntil(async () => {
      const caption = await this.getSearchTerm();
      const searchFinished = await this.searchResults.isExisting()
        && await this.searchResults.isDisplayed();
      return caption === term && searchFinished;
    });
  }

  async openResultByExactName(name) {
    const cards = await this.productCards;
    for (const card of cards) {
      const productName = card.$('[data-test="product-name"]');
      if ((await productName.getText()).trim() === name) {
        await clickWhenClickable(card);
        return;
      }
    }

    throw new Error(`Product card "${name}" was not found.`);
  }
}

export default new HomePage();
