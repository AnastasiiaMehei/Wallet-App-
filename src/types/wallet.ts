// Типи для wallet додатку

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface Card {
  limit: number;
  balance: number;
  available: number;
}

interface Balance {
  currency: string;
  amount: number;
  symbol: string;
}

interface Transaction {
  id: string;
  type: 'Payment' | 'Credit';
  amount: number;
  currency: string;
  merchant: string;
  description: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  authorizedUser?: string; // Ім'я авторизованої особи, якщо транзакція виконана кимось іншим
  icon?: string; // Назва іконки для транзакції
}

interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate: number;
}

interface WalletData {
  user: User;
  card?: Card;
  dailyPoints?: number;
  balances: Balance[];
  transactions: Transaction[];
  currencies: Currency[];
}

// Експорти типів
export type { User, Card, Balance, Transaction, Currency, WalletData };