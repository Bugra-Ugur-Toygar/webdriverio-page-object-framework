import { assert } from 'chai';
import { ROUTES } from '../../business/data/shop.data.js';
import accountPage from '../../business/pages/account.page.js';
import homePage from '../../business/pages/home.page.js';
import loginPage from '../../business/pages/login.page.js';
import shopSteps from '../../business/steps/shop.steps.js';

describe('Customer registration', () => {
  it('New customer creates an account', async () => {
    // Given
    await homePage.open();
    assert.isFalse(await homePage.header.isSignedIn());

    // When
    const customer = await shopSteps.registerCustomer();

    // Then
    assert.include(await loginPage.getCurrentUrl(), ROUTES.login);
    assert.isTrue(await loginPage.isFormDisplayed());

    // And
    await shopSteps.signIn(customer);
    assert.equal(await accountPage.header.getUserName(), customer.fullName);
  });
});
