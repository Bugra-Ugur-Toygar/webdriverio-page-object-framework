import { $, browser } from '@wdio/globals';
import { clickWhenClickable } from '../../core/utils/actions.js';
import { UI_TEXTS } from '../data/shop.data.js';
import AppPage from './app.page.js';

class ProductDetailsPage extends AppPage {
  constructor() {
    super('');
  }

  get productName() {
    return $('[data-test="product-name"]');
  }

  get unitPrice() {
    return $('[data-test="unit-price"]');
  }

  get addToCartButton() {
    return $('[data-test="add-to-cart"]');
  }

  get addToFavoritesButton() {
    return $('[data-test="add-to-favorites"]');
  }

  get favoriteConfirmation() {
    return $('.toast-message');
  }

  async getProductName() {
    await this.productName.waitForDisplayed();
    return (await this.productName.getText()).split('\n')[0].trim();
  }

  async getProductPrice() {
    await this.unitPrice.waitForDisplayed();
    const priceText = await (await this.unitPrice.parentElement()).getText();
    return priceText.replace(/\s+/g, '');
  }

  async waitUntilNameIs(name) {
    await browser.waitUntil(async () => (await this.getProductName()) === name);
  }

  async addToCart() {
    const previousQuantity = await this.header.getCartQuantity();
    await clickWhenClickable(this.addToCartButton);
    await browser.waitUntil(async () => (await this.header.getCartQuantity()) !== previousQuantity);
  }

  async addToFavorites() {
    await clickWhenClickable(this.addToFavoritesButton);
    await this.favoriteConfirmation.waitForDisplayed();
    await browser.waitUntil(
      async () => (await this.favoriteConfirmation.getText()).includes(UI_TEXTS.favoriteAdded)
    );
  }
}

export default new ProductDetailsPage();
