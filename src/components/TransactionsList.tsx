import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faArrowLeft, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { loadWalletData } from '../utils/dataLoader';

// Локальні типи для цього компонента
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
import TransactionItem from './TransactionItem';
import CardBalanceBlock from './CardBalanceBlock';
import NoPaymentBlock from './NoPaymentBlock';
import DailyPointsBlock from './DailyPointsBlock';
import './TransactionsList.css';

const TransactionsList: React.FC = () => {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadWalletData();
        setWalletData(data);
        setFilteredTransactions(data.transactions);
      } catch (err) {
        setError('Помилка завантаження даних');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!walletData) return;

    let filtered = walletData.transactions;

    // Фільтр по типу
    if (filterType !== 'all') {
      filtered = filtered.filter(transaction => transaction.type === filterType);
    }

    // Фільтр по пошуку
    if (searchTerm) {
      filtered = filtered.filter(transaction =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTransactions(filtered);
  }, [searchTerm, filterType, walletData]);

  const handleTransactionClick = (transaction: Transaction) => {
    navigate(`/transaction/${transaction.id}`);
  };

  const getTransactionStats = () => {
    if (!walletData) return { total: 0, payments: 0, credits: 0 };

    const transactions = walletData.transactions;
    return {
      total: transactions.length,
      payments: transactions.filter(t => t.type === 'Payment').length,
      credits: transactions.filter(t => t.type === 'Credit').length,
    };
  };

  if (loading) {
    return (
      <div className="transactions-list-page">
        <div className="loading">
          <FontAwesomeIcon icon={faHistory} spin size="2x" />
          <p>Завантаження транзакцій...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="transactions-list-page">
        <div className="error">
          <FontAwesomeIcon icon={faHistory} size="2x" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const stats = getTransactionStats();

  return (
    <div className="transactions-list-page">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Назад</span>
        </button>
        <h1>
          <FontAwesomeIcon icon={faHistory} />
          Історія транзакцій
        </h1>
      </header>

      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-number">{stats.total}</span>
          <span className="stat-label">Всього</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.payments}</span>
          <span className="stat-label">Поповнення</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.credits}</span>
          <span className="stat-label">Витрати</span>
        </div>
      </div>

      {/* Card Balance Block */}
      {walletData.card && <CardBalanceBlock card={walletData.card} />}

      {/* No Payment Block */}
      <NoPaymentBlock />

      {/* Daily Points Block */}
      {walletData.dailyPoints && <DailyPointsBlock points={walletData.dailyPoints} />}

      {/* Recent Transactions Header */}
      <div className="section-header">
        <h2>
          <FontAwesomeIcon icon={faHistory} />
          Останні транзакції ({filteredTransactions.length})
        </h2>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Пошук за назвою або описом..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            <FontAwesomeIcon icon={faFilter} />
            Всі
          </button>
          <button
            className={`filter-btn ${filterType === 'Payment' ? 'active' : ''}`}
            onClick={() => setFilterType('Payment')}
          >
            Поповнення
          </button>
          <button
            className={`filter-btn ${filterType === 'Credit' ? 'active' : ''}`}
            onClick={() => setFilterType('Credit')}
          >
            Витрати
          </button>
        </div>
      </div>

      <div className="transactions-container">
        {filteredTransactions.length === 0 ? (
          <div className="empty-state">
            <FontAwesomeIcon icon={faHistory} size="3x" />
            <p>Транзакцій не знайдено</p>
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              onClick={() => handleTransactionClick(transaction)}
              className="transaction-item-clickable"
            >
              <TransactionItem transaction={transaction} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionsList;