import { assert } from 'chai';
import { PRODUCTS } from '../../business/data/shop.data.js';
import homePage from '../../business/pages/home.page.js';

describe('Product search', () => {
  it('Customer searches for an exact product by name', async () => {
    // Given
    await homePage.open();
    assert.isAbove(await homePage.getProductCount(), 0);

    // When
    await homePage.searchFor(PRODUCTS.combinationPliers);

    // Then
    const names = await homePage.getProductNames();
    assert.include(names, PRODUCTS.combinationPliers);

    // And
    names.forEach((name) => {
      assert.include(name.toLowerCase(), PRODUCTS.combinationPliers.toLowerCase());
    });
    assert.notInclude(names, PRODUCTS.clawHammer);
  });
});
