// Локальні типи для цього файлу
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
  authorizedUser?: string;
  icon?: string;
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


const walletData: WalletData = {
  "user": {
    "id": "user-001",
    "name": "Anastasiia",
    "email": "Anastas@mail.com",
    "createdAt": "2024-01-01T00:00:00Z"
  },
  "card": {
    "limit": 1500.00,
    "balance": 847.23,
    "available": 652.77
  },
  "dailyPoints": 247,
  "balances": [
    {
      "currency": "USD",
      "amount": 1250.50,
      "symbol": "$"
    }
  ],
  "transactions": [
    {
      "id": "tx-001",
      "type": "Credit",
      "amount": 89.99,
      "currency": "USD",
      "merchant": "IKEA",
      "description": "Pending - Home decor purchase",
      "timestamp": "2024-01-10T14:30:00Z",
      "status": "pending",
      "authorizedUser": "Anna Johnson"
    },
    {
      "id": "tx-002",
      "type": "Credit",
      "amount": 45.67,
      "currency": "USD",
      "merchant": "Starbucks",
      "description": "Coffee and pastry",
      "timestamp": "2024-01-10T09:15:00Z",
      "status": "completed"
    },
    {
      "id": "tx-003",
      "type": "Credit",
      "amount": 127.50,
      "currency": "USD",
      "merchant": "Target",
      "description": "Groceries and household items",
      "timestamp": "2024-01-09T16:45:00Z",
      "status": "completed",
      "authorizedUser": "Mike Chen"
    },
    {
      "id": "tx-004",
      "type": "Payment",
      "amount": 500.00,
      "currency": "USD",
      "merchant": "Card Payment",
      "description": "Monthly card payment",
      "timestamp": "2024-01-09T12:00:00Z",
      "status": "completed"
    },
    {
      "id": "tx-005",
      "type": "Credit",
      "amount": 234.89,
      "currency": "USD",
      "merchant": "Amazon",
      "description": "Electronics and books",
      "timestamp": "2024-01-08T20:30:00Z",
      "status": "completed",
      "authorizedUser": "Sarah Williams"
    },
    {
      "id": "tx-006",
      "type": "Credit",
      "amount": 67.43,
      "currency": "USD",
      "merchant": "Walmart",
      "description": "Clothing and accessories",
      "timestamp": "2024-01-08T15:20:00Z",
      "status": "completed"
    },
    {
      "id": "tx-007",
      "type": "Payment",
      "amount": 300.00,
      "currency": "USD",
      "merchant": "Card Payment",
      "description": "Additional payment",
      "timestamp": "2024-01-07T10:00:00Z",
      "status": "completed"
    },
    {
      "id": "tx-008",
      "type": "Credit",
      "amount": 156.78,
      "currency": "USD",
      "merchant": "Best Buy",
      "description": "Computer accessories",
      "timestamp": "2024-01-06T18:45:00Z",
      "status": "completed"
    },
    {
      "id": "tx-009",
      "type": "Credit",
      "amount": 92.34,
      "currency": "USD",
      "merchant": "Macy's",
      "description": "Fashion items",
      "timestamp": "2024-01-05T14:20:00Z",
      "status": "completed"
    },
    {
      "id": "tx-010",
      "type": "Credit",
      "amount": 78.90,
      "currency": "USD",
      "merchant": "Home Depot",
      "description": "Tools and hardware",
      "timestamp": "2024-01-04T11:30:00Z",
      "status": "completed"
    },
    {
      "id": "tx-011",
      "type": "Credit",
      "amount": 45.23,
      "currency": "USD",
      "merchant": "Subway",
      "description": "Lunch sandwich",
      "timestamp": "2024-01-03T12:45:00Z",
      "status": "completed"
    },
    {
      "id": "tx-012",
      "type": "Payment",
      "amount": 200.00,
      "currency": "USD",
      "merchant": "Card Payment",
      "description": "Weekly payment",
      "timestamp": "2024-01-02T09:00:00Z",
      "status": "completed"
    }
  ],
  "currencies": [
    {
      "code": "USD",
      "name": "US Dollar",
      "symbol": "$",
      "rate": 1.0
    }
  ]
};


export const loadWalletData = async (): Promise<WalletData> => {
  try {
    
    await new Promise(resolve => setTimeout(resolve, 500));
    return walletData;
  } catch (error) {
    console.error('Помилка завантаження даних:', error);
    throw error;
  }
};


export const saveWalletData = async (data: WalletData): Promise<WalletData> => {
  try {
   
    console.log('Збереження даних:', data);
    return data;
  } catch (error) {
    console.error('Помилка збереження даних:', error);
    throw error;
  }
};