import { expect } from 'chai';
import { CHECKOUT_ADDRESS, FORMATS, PRODUCTS, UI_TEXTS } from '../../business/data/shop.data.js';
import checkoutPage from '../../business/pages/checkout.page.js';
import shopSteps from '../../business/steps/shop.steps.js';

describe('Checkout', () => {
  before(async () => {
    // Given
    await shopSteps.registerAndSignIn();
    await shopSteps.addProductToCart(PRODUCTS.clawHammer);
  });

  it('Customer completes checkout for items in the basket', async () => {
    // When
    const confirmation = await checkoutPage.completeCheckout(CHECKOUT_ADDRESS);

    // Then
    expect(confirmation.invoiceNumber).to.match(FORMATS.invoiceNumber);

    // And
    expect(confirmation.message).to.include(UI_TEXTS.orderConfirmation);
  });
});
