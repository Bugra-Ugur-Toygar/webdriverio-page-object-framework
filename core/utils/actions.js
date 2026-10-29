import { browser } from '@wdio/globals';

export async function clickWhenClickable(element) {
  await element.waitForClickable();
  await element.click();
}

export async function typeInto(element, value) {
  await element.waitForDisplayed();
  await element.click();
  await element.setValue(value);
  await browser.keys('Tab');
}

export async function selectByValue(selectElement, value) {
  await selectElement.waitForDisplayed();
  await browser.waitUntil(async () => {
    const values = await selectElement.$$('option').map((option) => option.getAttribute('value'));
    return values.includes(value);
  });
  await selectElement.selectByAttribute('value', value);
}

export async function waitForUrlContaining(fragment) {
  await browser.waitUntil(
    async () => (await browser.getUrl()).includes(fragment),
    { timeoutMsg: `URL did not contain "${fragment}".` }
  );
}
