import { ROUTES } from '../data/shop.data.js';
import AppPage from './app.page.js';

class AccountPage extends AppPage {
  constructor() {
    super(ROUTES.account);
  }
}

export default new AccountPage();
