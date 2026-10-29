import BaseComponent from '../../core/base.component.js';
import { selectByValue, typeInto } from '../../core/utils/actions.js';

class AddressFormComponent extends BaseComponent {
  get countrySelect() {
    return this.rootEl.$('[data-test="country"]');
  }

  get postalCodeInput() {
    return this.rootEl.$('[data-test="postal_code"]');
  }

  get houseNumberInput() {
    return this.rootEl.$('[data-test="house_number"]');
  }

  get streetInput() {
    return this.rootEl.$('[data-test="street"]');
  }

  get cityInput() {
    return this.rootEl.$('[data-test="city"]');
  }

  get stateInput() {
    return this.rootEl.$('[data-test="state"]');
  }

  async fill(address) {
    if (address.country !== undefined) {
      await selectByValue(this.countrySelect, address.country);
    }
    const fields = {
      postalCode: this.postalCodeInput,
      houseNumber: this.houseNumberInput,
      street: this.streetInput,
      city: this.cityInput,
      state: this.stateInput,
    };

    for (const [name, input] of Object.entries(fields)) {
      if (address[name] !== undefined) {
        await typeInto(input, address[name]);
      }
    }
  }

  async getAddress() {
    return {
      street: await this.streetInput.getValue(),
      postalCode: await this.postalCodeInput.getValue(),
      city: await this.cityInput.getValue(),
      state: await this.stateInput.getValue(),
    };
  }

  async isAutofilled() {
    const address = await this.getAddress();
    return address.street.trim() !== ''
      && address.city.trim() !== ''
      && address.state.trim() !== '';
  }
}

export default AddressFormComponent;
