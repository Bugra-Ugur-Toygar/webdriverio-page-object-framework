import { should } from 'chai';

export const config = {
  runner: 'local',
  specs: ['../specs/**/*.spec.js'],
  maxInstances: 2,
  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: ['--window-size=1920,1080', '--lang=en-US'],
      prefs: {
        'intl.accept_languages': 'en-US,en',
      },
    },
  }],
  logLevel: 'warn',
  baseUrl: 'https://practicesoftwaretesting.com',
  waitforTimeout: 10000,
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
  before() {
    should();
  },
};
