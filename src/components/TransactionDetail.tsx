import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faExchangeAlt,
  faCheckCircle,
  faClock,
  faTimesCircle,
  faCopy,
  faShare
} from '@fortawesome/free-solid-svg-icons';
import { loadWalletData } from '../utils/dataLoader';
import { faCreditCard, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './TransactionDetail.css';

// Локальні типи для цього компонента
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

const TransactionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadWalletData();

        const foundTransaction = data.transactions.find(t => t.id === id);
        if (foundTransaction) {
          setTransaction(foundTransaction);
        } else {
          setError('Транзакцію не знайдено');
        }
      } catch (err) {
        setError('Помилка завантаження даних');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const getTransactionTypeIcon = () => {
    if (!transaction) return faExchangeAlt;
    const merchantLower = transaction.merchant.toLowerCase();
    if (merchantLower.includes('ikea') || merchantLower.includes('home')) {
      return faShoppingCart;
    }
    return faCreditCard;
  };

  const getTransactionTypeColor = () => {
    if (!transaction) return '#6c757d';
    // Проста генерація кольору
    const colors = ['#2C3E50', '#8E44AD', '#2C5530', '#D35400'];
    let hash = 0;
    for (let i = 0; i < transaction.merchant.length; i++) {
      hash = transaction.merchant.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Якщо менше 7 днів - показуємо назву дня
    if (diffDays <= 7) {
      const dayNames = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'];
      return dayNames[date.getDay()];
    }

    // Інакше показуємо повну дату
    return date.toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Можна додати toast повідомлення про успішне копіювання
      console.log('Скопійовано в буфер обміну');
    });
  };

  const shareTransaction = () => {
    if (navigator.share && transaction) {
      navigator.share({
        title: 'Деталі транзакції',
        text: `Транзакція ${transaction.id}: ${transaction.description}`,
        url: window.location.href,
      });
    } else {
      copyToClipboard(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="transaction-detail-page">
        <div className="loading">
          <FontAwesomeIcon icon={faClock} spin size="2x" />
          <p>Завантаження деталей транзакції...</p>
        </div>
      </div>
    );
  }

  if (error || !transaction) {
    return (
      <div className="transaction-detail-page">
        <div className="error">
          <FontAwesomeIcon icon={faTimesCircle} size="2x" />
          <p>{error || 'Транзакцію не знайдено'}</p>
          <button className="back-btn" onClick={() => navigate('/transactions')}>
            Повернутися до списку
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="transaction-detail-page">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/transactions')}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>До списку</span>
        </button>
        <h1>Деталі транзакції</h1>
        <button className="share-btn" onClick={shareTransaction}>
          <FontAwesomeIcon icon={faShare} />
        </button>
      </header>

      <div className="transaction-detail-card">
        <div className="transaction-header">
          <div className="transaction-icon-large" style={{ backgroundColor: getTransactionTypeColor() }}>
            <FontAwesomeIcon icon={getTransactionTypeIcon()} size="2x" />
          </div>
          <div className="transaction-main-info">
            <h2>{transaction.merchant}</h2>
            <p className="transaction-description">{transaction.description}</p>
            <div className="transaction-id">
              <span>ID: {transaction.id}</span>
              <button
                className="copy-btn"
                onClick={() => copyToClipboard(transaction.id)}
                title="Копіювати ID"
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>
            </div>
          </div>
        </div>

        <div className="transaction-amount-section">
          <div className="amount-display">
            <div className="amount-value">
              <span className={`amount-sign ${transaction.type === 'Payment' ? 'positive' : 'negative'}`}>
                {transaction.type === 'Payment' ? '+' : '-'}
              </span>
              <span className="amount-number">${transaction.amount.toFixed(2)}</span>
            </div>
            <div className="currency-label">{transaction.currency}</div>
          </div>
        </div>

        <div className="transaction-details-grid">
          <div className="detail-item">
            <label>Тип операції</label>
            <span className="detail-value">{transaction.type}</span>
          </div>

          <div className="detail-item">
            <label>Статус</label>
            <span className={`status-badge status-${transaction.status}`}>
              <FontAwesomeIcon icon={
                transaction.status === 'completed' ? faCheckCircle :
                transaction.status === 'pending' ? faClock :
                faTimesCircle
              } />
              {transaction.status}
            </span>
          </div>

          <div className="detail-item">
            <label>Дата та час</label>
            <span className="detail-value">{formatDate(transaction.timestamp)}</span>
          </div>

          <div className="detail-item">
            <label>Валюта</label>
            <span className="detail-value">
              <FontAwesomeIcon icon={
                transaction.currency === 'USD' ? faExchangeAlt :
                transaction.currency === 'EUR' ? faExchangeAlt :
                faExchangeAlt
              } />
              {transaction.currency}
            </span>
          </div>

          <div className="detail-item">
            <label>ID транзакції</label>
            <span className="detail-value id-value">
              {transaction.id}
              <button
                className="copy-btn-small"
                onClick={() => copyToClipboard(transaction.id)}
                title="Копіювати ID"
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>
            </span>
          </div>

          <div className="detail-item">
            <label>Продавець</label>
            <span className="detail-value">{transaction.merchant}</span>
          </div>

          {transaction.authorizedUser && (
            <div className="detail-item">
              <label>Авторизований користувач</label>
              <span className="detail-value authorized-user">
                <FontAwesomeIcon icon={faCheckCircle} />
                {transaction.authorizedUser}
              </span>
            </div>
          )}

          <div className="detail-item full-width">
            <label>Опис</label>
            <span className="detail-value description">{transaction.description}</span>
          </div>
        </div>

        <div className="transaction-actions">
          <button className="action-btn secondary" onClick={() => navigate('/transactions')}>
            Переглянути всі транзакції
          </button>
          <button className="action-btn primary" onClick={() => navigate('/')}>
            До головного екрану
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;