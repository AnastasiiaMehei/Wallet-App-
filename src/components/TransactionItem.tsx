import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faMoneyBillWave, faShoppingCart, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './TransactionItem.css';

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

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const navigate = useNavigate();

  // Проста логіка вибору іконки
  const getSimpleIcon = (merchant) => {
    const merchantLower = merchant.toLowerCase();
    if (merchantLower.includes('coffee') || merchantLower.includes('starbucks')) {
      return faMoneyBillWave;
    }
    if (merchantLower.includes('ikea') || merchantLower.includes('home')) {
      return faShoppingCart;
    }
    return faCreditCard;
  };

  const getSimpleColor = (merchant) => {
    // Проста генерація кольору на основі імені
    const colors = ['#2C3E50', '#8E44AD', '#2C5530', '#D35400', '#154360'];
    let hash = 0;
    for (let i = 0; i < merchant.length; i++) {
      hash = merchant.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const transactionIcon = getSimpleIcon(transaction.merchant);
  const iconColor = getSimpleColor(transaction.merchant);

  const getDisplayDescription = () => {
    if (transaction.status === 'pending') {
      return `Pending - ${transaction.description}`;
    }
    return transaction.description;
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };


  return (
    <div className="transaction-item" onClick={() => navigate(`/transaction/${transaction.id}`)}>
      {/* Великий квадрат з символом транзакції */}
      <div className="transaction-icon-large" style={{ backgroundColor: iconColor }}>
        <FontAwesomeIcon icon={transactionIcon} />
      </div>

      {/* Контент з інформацією про транзакцію */}
      <div className="transaction-content">
        {/* Тип транзакції (Apple/IKEA/Payment) */}
        <div className="transaction-type">{transaction.merchant}</div>

        {/* Опис (з "Pending - " якщо потрібно) */}
        <span className="transaction-description">{getDisplayDescription()}</span>

        {/* Дата */}
        <span className="transaction-date">{formatDate(transaction.timestamp)}</span>
      </div>

      {/* Сума транзакції з стрілочкою */}
      <div className="transaction-amount">
        <span className={`amount ${transaction.type === 'Payment' ? 'positive' : 'negative'}`}>
          {transaction.type === 'Payment' ? '' : ''}
          ${transaction.amount.toFixed(2)}
        </span>
        <div className="transaction-arrow">
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;