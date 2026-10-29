import { expect } from 'chai';
import { FORMATS, PRODUCTS } from '../../business/data/shop.data.js';
import homePage from '../../business/pages/home.page.js';
import productDetailsPage from '../../business/pages/product-details.page.js';
import shopSteps from '../../business/steps/shop.steps.js';

describe('Product details', () => {
  it('Customer views a product details page', async () => {
    // Given
    await shopSteps.searchForProduct(PRODUCTS.combinationPliers);
    expect(await homePage.getProductNames()).to.include(PRODUCTS.combinationPliers);

    // When
    await homePage.openResultByExactName(PRODUCTS.combinationPliers);

    // Then
    expect(await productDetailsPage.getProductName()).to.equal(PRODUCTS.combinationPliers);

    // And
    expect(await productDetailsPage.getProductPrice()).to.match(FORMATS.price);
  });
});
