import { $ } from '@wdio/globals';
import { clickWhenClickable, typeInto, waitForUrlContaining } from '../../core/utils/actions.js';
import AddressFormComponent from '../components/address-form.component.js';
import { ROUTES } from '../data/shop.data.js';
import AppPage from './app.page.js';

class RegisterPage extends AppPage {
  constructor() {
    super(ROUTES.register);
    this.addressForm = new AddressFormComponent('[data-test="register-form"]');
  }

  get firstNameInput() {
    return $('[data-test="first-name"]');
  }

  get lastNameInput() {
    return $('[data-test="last-name"]');
  }

  get dateOfBirthInput() {
    return $('[data-test="dob"]');
  }

  get phoneInput() {
    return $('[data-test="phone"]');
  }

  get emailInput() {
    return $('[data-test="email"]');
  }

  get passwordInput() {
    return $('[data-test="password"]');
  }

  get submitButton() {
    return $('[data-test="register-submit"]');
  }

  async open() {
    await super.open();
    await this.firstNameInput.waitForDisplayed();
  }

  async register(customer) {
    await typeInto(this.firstNameInput, customer.firstName);
    await typeInto(this.lastNameInput, customer.lastName);
    await typeInto(this.dateOfBirthInput, customer.dateOfBirth);
    await this.addressForm.fill(customer);
    await typeInto(this.phoneInput, customer.phone);
    await typeInto(this.emailInput, customer.email);
    await typeInto(this.passwordInput, customer.password);
    await clickWhenClickable(this.submitButton);
    await waitForUrlContaining(ROUTES.login);
  }
}

export default new RegisterPage();
