import { expect } from 'chai';
import { DEFAULT_CUSTOMER, ROUTES, UI_TEXTS } from '../../business/data/shop.data.js';
import accountPage from '../../business/pages/account.page.js';
import homePage from '../../business/pages/home.page.js';
import shopSteps from '../../business/steps/shop.steps.js';

describe('Customer sign in', () => {
  it('Customer signs in with valid credentials', async () => {
    // Given
    const customer = DEFAULT_CUSTOMER;

    // When
    await shopSteps.signIn(customer);

    // Then
    expect(await accountPage.getCurrentUrl()).to.include(ROUTES.account);
    expect(await accountPage.getHeading()).to.equal(UI_TEXTS.accountHeading);
    expect(await accountPage.header.getUserName()).to.equal(customer.fullName);

    // And
    await homePage.open();
    expect(await homePage.getProductCount()).to.be.above(0);
  });
});
