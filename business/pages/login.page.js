import { $ } from '@wdio/globals';
import { clickWhenClickable, typeInto, waitForUrlContaining } from '../../core/utils/actions.js';
import { ROUTES } from '../data/shop.data.js';
import AppPage from './app.page.js';

class LoginPage extends AppPage {
  constructor() {
    super(ROUTES.login);
  }

  get emailInput() {
    return $('[data-test="email"]');
  }

  get passwordInput() {
    return $('[data-test="password"]');
  }

  get submitButton() {
    return $('[data-test="login-submit"]');
  }

  async open() {
    await super.open();
    await this.emailInput.waitForDisplayed();
  }

  async isFormDisplayed() {
    await this.emailInput.waitForDisplayed();
    return this.emailInput.isDisplayed();
  }

  async signIn(email, password) {
    await typeInto(this.emailInput, email);
    await typeInto(this.passwordInput, password);
    await clickWhenClickable(this.submitButton);
    await waitForUrlContaining(ROUTES.account);
  }
}

export default new LoginPage();
