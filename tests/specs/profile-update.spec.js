import { UI_TEXTS, UPDATED_ADDRESS } from '../../business/data/shop.data.js';
import profilePage from '../../business/pages/profile.page.js';
import shopSteps from '../../business/steps/shop.steps.js';

describe('Customer profile', () => {
  before(async () => {
    // Given
    await shopSteps.registerAndSignIn();
    await profilePage.open();
  });

  it('Customer updates profile information', async () => {
    // When
    const confirmation = await profilePage.updateAddress(UPDATED_ADDRESS);

    // Then
    confirmation.should.equal(UI_TEXTS.profileUpdated);

    // And
    await profilePage.reload();
    const address = await profilePage.getAddress();
    address.should.deep.equal(UPDATED_ADDRESS);
  });
});
