import { assert } from 'chai';
import { PRODUCTS } from '../../business/data/shop.data.js';
import checkoutPage from '../../business/pages/checkout.page.js';
import productDetailsPage from '../../business/pages/product-details.page.js';
import shopSteps from '../../business/steps/shop.steps.js';

describe('Shopping basket', () => {
  before(async () => {
    // Given
    await shopSteps.openProductByName(PRODUCTS.clawHammer);
  });

  it('Customer adds a product to the basket', async () => {
    // When
    const quantityBefore = await productDetailsPage.header.getCartQuantity();
    await productDetailsPage.addToCart();
    const quantityAfter = await productDetailsPage.header.getCartQuantity();
    await productDetailsPage.header.openCart();

    // Then
    assert.include(await checkoutPage.getItemTitles(), PRODUCTS.clawHammer);

    // And
    assert.strictEqual(quantityAfter - quantityBefore, 1);
  });
});
