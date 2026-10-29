import { createUniqueToken } from '../../core/utils/unique-id.js';

const DEFAULT_COUNTRY = 'AU';
const DEFAULT_POSTAL_CODE = '3211';
const DEFAULT_HOUSE_NUMBER = '42';
const ADULT_DATE_OF_BIRTH = '1990-05-15';

export const ROUTES = {
  home: '/',
  login: '/auth/login',
  register: '/auth/register',
  account: '/account',
  profile: '/account/profile',
  favorites: '/account/favorites',
  checkout: '/checkout',
};

export const UI_TEXTS = {
  accountHeading: 'My account',
  profileUpdated: 'Your profile is successfully updated!',
  favoriteAdded: 'Product added to your favorites list.',
  orderConfirmation: 'Thanks for your order',
  confirmButton: 'Confirm',
};

export const FORMATS = {
  price: /^\$\d+\.\d{2}$/,
  invoiceNumber: /^INV-\d{10}$/,
};

export const PAYMENT_METHOD = 'cash-on-delivery';

export const DEFAULT_CUSTOMER = {
  email: 'customer@practicesoftwaretesting.com',
  password: 'welcome01',
  fullName: 'Jane Doe',
};

export const PRODUCTS = {
  combinationPliers: 'Combination Pliers',
  clawHammer: 'Claw Hammer',
};

export const UPDATED_ADDRESS = {
  street: '18 George Street',
  postalCode: '2000',
  city: 'Sydney',
  state: 'New South Wales',
};

export const CHECKOUT_ADDRESS = {
  country: DEFAULT_COUNTRY,
  postalCode: DEFAULT_POSTAL_CODE,
  houseNumber: DEFAULT_HOUSE_NUMBER,
};

export function createCustomer() {
  const token = createUniqueToken();
  const nameSuffix = token.replace(/[^a-z]/gi, '').slice(0, 8);
  const firstName = 'Alex';
  const lastName = `Buyer${nameSuffix}`;

  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    dateOfBirth: ADULT_DATE_OF_BIRTH,
    country: DEFAULT_COUNTRY,
    postalCode: DEFAULT_POSTAL_CODE,
    houseNumber: DEFAULT_HOUSE_NUMBER,
    street: 'Collins Street',
    city: 'Melbourne',
    state: 'Victoria',
    phone: '0412345678',
    email: `buyer.${token}@example.com`,
    password: `Aa1!${token}`,
  };
}
