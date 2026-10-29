import { PRODUCTS } from '../../business/data/shop.data.js';
import favoritesPage from '../../business/pages/favorites.page.js';
import homePage from '../../business/pages/home.page.js';
import shopSteps from '../../business/steps/shop.steps.js';

describe('Customer favorites', () => {
  before(async () => {
    // Given
    await shopSteps.registerAndSignIn();
    await homePage.open();
  });

  it('Signed-in customer adds a product to favorites', async () => {
    // When
    await shopSteps.addProductToFavorites(PRODUCTS.combinationPliers);

    // Then
    await shopSteps.openFavorites();
    const names = await favoritesPage.getProductNames();
    names.should.include(PRODUCTS.combinationPliers);

    // And
    await favoritesPage.reload();
    const namesAfterReload = await favoritesPage.getProductNames();
    namesAfterReload.should.include(PRODUCTS.combinationPliers);
  });
});
