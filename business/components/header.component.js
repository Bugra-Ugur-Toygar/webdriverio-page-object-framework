import BaseComponent from '../../core/base.component.js';
import { clickWhenClickable, waitForUrlContaining } from '../../core/utils/actions.js';
import { ROUTES } from '../data/shop.data.js';

class HeaderComponent extends BaseComponent {
  constructor() {
    super('nav:has([data-test="nav-home"])');
  }

  get userMenu() {
    return this.rootEl.$('[data-test="nav-menu"]');
  }

  get favoritesLink() {
    return this.rootEl.$('[data-test="nav-my-favorites"]');
  }

  get cartLink() {
    return this.rootEl.$('[data-test="nav-cart"]');
  }

  get cartQuantityBadge() {
    return this.rootEl.$('[data-test="cart-quantity"]');
  }

  async isSignedIn() {
    return this.userMenu.isExisting();
  }

  async getUserName() {
    await this.userMenu.waitForDisplayed();
    return (await this.userMenu.getText()).trim();
  }

  async getCartQuantity() {
    if (!(await this.cartQuantityBadge.isExisting())) {
      return 0;
    }

    return Number((await this.cartQuantityBadge.getText()).trim());
  }

  async openCart() {
    await clickWhenClickable(this.cartLink);
    await waitForUrlContaining(ROUTES.checkout);
  }

  async openFavorites() {
    await clickWhenClickable(this.userMenu);
    await clickWhenClickable(this.favoritesLink);
    await waitForUrlContaining(ROUTES.favorites);
  }
}

export default new HeaderComponent();
