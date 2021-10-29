import { Resource, ResourceLanguage } from "i18next";
import en from "./en";

export interface TranslationsKeys {
  brandingName: string;
  landingBannerText: string;
  login: string;
  signup: string;
  logout: string;
  tryFree: string;
  startFree: string;
  email: string;
  password: string;
  forgotPassword: string;
  fullName: string;
  firstName: string;
  lastName: string;
  or: string;
  noAccount: string;
  alreadyHaveAnAccount: string;
  showcaseTitle: string;
  information: string;
  shippingPolicy: string;
  refundPolicy: string;
  privacyPolicy: string;
  termsOfService: string;
  companyName: string;
  infoEmail: string;
  contactNumber: string;
  companyLocation: string;
  newsletter: string;
  emailAddress: string;
  subscribe: string;
  copyright: string;
  invalidCredentials: string;
  yourCart: string;
  product: string;
  price: string;
  quantity: string;
  subtotal: string;
  total: string;
  goToCheckout: string;
  account: string;
  shoppingCart: string;
  change: string;
  shippingAddress: string;
  shippingRate: string;
  paymentMethod: string;
  yourOrder: string;
  delivery: string;
  taxes: string;
  phoneNumber: string;
  address: string;
  aptSuite: string;
  city: string;
  state: string;
  province: string;
  country: string;
  postalCode: string;
  saveAndDeliverHere: string;
  cancel: string;
  cardNumber: string;
  cardNumberPlaceholder: string;
  expiryDate: string;
  expiryDatePlaceholder: string;
  cvc: string;
  cvcPlaceholder: string;
  pay: string;
  arrivesIn: string;
  placeOrder: string;
  myOrders: string;
  accessLater: string;
  accessLaterDesc: string;
  createAccount: string;
  status: string;
  date: string;
  orderSummary: string;
  trackingLink: string;
  trackingProgress: string;
  addToCart: string;
}

export interface Translations extends ResourceLanguage {
  translations: TranslationsKeys;
}

export const I18nResource: Resource = {
  en,
};
