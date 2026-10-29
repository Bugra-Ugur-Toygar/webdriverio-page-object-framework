import { browser } from '@wdio/globals';

class BasePage {
  constructor(path) {
    this.path = path;
  }

  async open() {
    await browser.url(this.path);
  }

  async getCurrentUrl() {
    return browser.getUrl();
  }

  async reload() {
    await browser.refresh();
  }
}

export default BasePage;
