import { $ } from '@wdio/globals';

class BaseComponent {
  constructor(rootSelector) {
    this.rootSelector = rootSelector;
  }

  get rootEl() {
    return $(this.rootSelector);
  }
}

export default BaseComponent;
