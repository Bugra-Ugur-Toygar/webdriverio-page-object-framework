import { createCustomer } from '../data/shop.data.js';
import accountPage from '../pages/account.page.js';
import favoritesPage from '../pages/favorites.page.js';
import homePage from '../pages/home.page.js';
import loginPage from '../pages/login.page.js';
import productDetailsPage from '../pages/product-details.page.js';
import registerPage from '../pages/register.page.js';

class ShopSteps {
  async signIn(credentials) {
    await loginPage.open();
    await loginPage.signIn(credentials.email, credentials.password);
    await accountPage.waitForHeading();
  }

  async registerCustomer() {
    const customer = createCustomer();
    await registerPage.open();
    await registerPage.register(customer);
    return customer;
  }

  async registerAndSignIn() {
    const customer = await this.registerCustomer();
    await this.signIn(customer);
    return customer;
  }

  async searchForProduct(name) {
    await homePage.open();
    await homePage.searchFor(name);
  }

  async openProductByName(name) {
    await this.searchForProduct(name);
    await homePage.openResultByExactName(name);
    await productDetailsPage.waitUntilNameIs(name);
  }

  async addProductToCart(name) {
    await this.openProductByName(name);
    await productDetailsPage.addToCart();
  }

  async addProductToFavorites(name) {
    await this.openProductByName(name);
    await productDetailsPage.addToFavorites();
  }

  async openFavorites() {
    await favoritesPage.header.openFavorites();
    await favoritesPage.waitForHeading();
  }
}

export default new ShopSteps();
