import { $, $$, browser } from '@wdio/globals';
import { clickWhenClickable, selectByValue } from '../../core/utils/actions.js';
import AddressFormComponent from '../components/address-form.component.js';
import { PAYMENT_METHOD, ROUTES, UI_TEXTS } from '../data/shop.data.js';
import AppPage from './app.page.js';

function invoiceNumberFrom(message) {
  const marker = 'invoice number is';
  const start = message.indexOf(marker);
  if (start < 0) {
    return '';
  }

  const value = message.slice(start + marker.length).trim();
  return value.endsWith('.') ? value.slice(0, -1).trim() : value;
}

class CheckoutPage extends AppPage {
  constructor() {
    super(ROUTES.checkout);
    this.addressForm = new AddressFormComponent('form:has([data-test="house_number"])');
  }

  get proceedFromCartButton() {
    return $('[data-test="proceed-1"]');
  }

  get proceedFromSignInButton() {
    return $('[data-test="proceed-2"]');
  }

  get proceedFromAddressButton() {
    return $('[data-test="proceed-3"]');
  }

  get paymentMethodSelect() {
    return $('[data-test="payment-method"]');
  }

  get finishButton() {
    return $('[data-test="finish"]');
  }

  get paymentSuccessMessage() {
    return $('[data-test="payment-success-message"]');
  }

  get orderConfirmation() {
    return $('#order-confirmation');
  }

  get itemTitles() {
    return $$('[data-test="product-title"]');
  }

  get addressLookupLoading() {
    return $('[data-test="postcode-lookup-loading"]');
  }

  async getItemTitles() {
    await browser.waitUntil(async () => (await this.readItemTitles()).length > 0);
    return this.readItemTitles();
  }

  async readItemTitles() {
    const titles = await this.itemTitles.map((title) => title.getText());
    return titles.map((title) => title.trim());
  }

  async completeCheckout(address) {
    await this.header.openCart();
    await clickWhenClickable(this.proceedFromCartButton);
    await clickWhenClickable(this.proceedFromSignInButton);
    await this.fillBillingAddress(address);
    return this.placeOrder();
  }

  async fillBillingAddress(address) {
    await this.addressForm.fill(address);
    await browser.waitUntil(async () => {
      const lookupFinished = !(await this.addressLookupLoading.isExisting());
      return lookupFinished && await this.addressForm.isAutofilled();
    });
    await clickWhenClickable(this.proceedFromAddressButton);
  }

  async placeOrder() {
    await selectByValue(this.paymentMethodSelect, PAYMENT_METHOD);
    await clickWhenClickable(this.finishButton);
    await browser.waitUntil(async () => (await this.finishButton.getText()).trim() === UI_TEXTS.confirmButton);
    await this.paymentSuccessMessage.waitForDisplayed();
    await clickWhenClickable(this.finishButton);
    await this.orderConfirmation.waitForDisplayed();

    let message = '';
    let invoiceNumber = '';
    await browser.waitUntil(async () => {
      message = (await this.orderConfirmation.getText()).replace(/\s+/g, ' ').trim();
      invoiceNumber = invoiceNumberFrom(message);
      return invoiceNumber !== '';
    });

    return { message, invoiceNumber };
  }
}

export default new CheckoutPage();
