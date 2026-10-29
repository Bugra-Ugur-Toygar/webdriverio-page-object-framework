import { $, $$, browser } from '@wdio/globals';
import { clickWhenClickable } from '../../core/utils/actions.js';
import AddressFormComponent from '../components/address-form.component.js';
import { ROUTES } from '../data/shop.data.js';
import AppPage from './app.page.js';

class ProfilePage extends AppPage {
  constructor() {
    super(ROUTES.profile);
    this.addressForm = new AddressFormComponent('form:has([data-test="update-profile-submit"])');
  }

  get phoneInput() {
    return $('[data-test="phone"]');
  }

  get submitButton() {
    return $('[data-test="update-profile-submit"]');
  }

  get alerts() {
    return $$('[role="alert"]');
  }

  async open() {
    await super.open();
    await this.waitForSavedProfile();
  }

  async waitForSavedProfile() {
    await this.addressForm.streetInput.waitForDisplayed();
    await browser.waitUntil(async () => {
      const street = await this.addressForm.streetInput.getValue();
      const phone = await this.phoneInput.getValue();
      return street.trim() !== '' && phone.trim() !== '';
    });
  }

  async updateAddress(address) {
    await this.addressForm.fill(address);
    await clickWhenClickable(this.submitButton);
    return this.getSaveConfirmation();
  }

  async getSaveConfirmation() {
    let confirmation = '';
    await browser.waitUntil(async () => {
      confirmation = await this.readDisplayedAlert();
      return confirmation !== '';
    });
    return confirmation;
  }

  async readDisplayedAlert() {
    const alerts = await this.alerts;
    for (const alert of alerts) {
      if (await alert.isDisplayed()) {
        return (await alert.getText()).replace(/\s+/g, ' ').trim();
      }
    }
    return '';
  }

  async getAddress() {
    await this.addressForm.streetInput.waitForDisplayed();
    return this.addressForm.getAddress();
  }

  async reload() {
    await super.reload();
    await this.waitForSavedProfile();
  }
}

export default new ProfilePage();
