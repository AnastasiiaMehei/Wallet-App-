// Removed IconDefinition import as it's not available in this version
import {
  faBitcoinSign,
  faDollarSign,
  faEuroSign,
  faSterlingSign,
  faYenSign,
  faWonSign,
  faShekelSign,
  faRubleSign,
  faTurkishLiraSign,
  faCoins,
  faGem
} from '@fortawesome/free-solid-svg-icons';

/**
 * Повертає відповідну іконку для валюти
 */
export const getCurrencyIcon = (currency: string) => {
  switch (currency.toUpperCase()) {
    case 'BTC':
      return faBitcoinSign;
    case 'ETH':
      return faCoins; // Using faCoins for Ethereum
    case 'USD':
      return faDollarSign;
    case 'EUR':
      return faEuroSign;
    case 'GBP':
      return faSterlingSign;
    case 'JPY':
      return faYenSign;
    case 'KRW':
      return faWonSign;
    case 'ILS':
      return faShekelSign;
    case 'RUB':
      return faRubleSign;
    case 'TRY':
      return faTurkishLiraSign;
    default:
      return faGem; // Using faGem as fallback
  }
};

/**
 * Повертає іконку для типу транзакції
 */
export const getTransactionIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'deposit':
      return faDollarSign;
    case 'withdrawal':
      return faDollarSign;
    case 'transfer':
      return faDollarSign;
    case 'purchase':
      return faDollarSign;
    case 'exchange':
      return faDollarSign;
    default:
      return faDollarSign;
  }
};