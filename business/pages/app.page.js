import { $ } from '@wdio/globals';
import BasePage from '../../core/base.page.js';
import header from '../components/header.component.js';

class AppPage extends BasePage {
  constructor(path) {
    super(path);
    this.header = header;
  }

  get heading() {
    return $('[data-test="page-title"]');
  }

  async waitForHeading() {
    await this.heading.waitForDisplayed();
  }

  async getHeading() {
    await this.heading.waitForDisplayed();
    return (await this.heading.getText()).trim();
  }
}

export default AppPage;
