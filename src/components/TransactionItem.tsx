import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faMoneyBillWave, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
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

  const getDisplayDescription = () => {
    if (transaction.status === 'pending') {
      return `Pending - ${transaction.description}`;
    }
    return transaction.description;
  };

  return (
    <div className="transaction-item">
      <div className="transaction-icon" style={{ backgroundColor: iconColor }}>
        <FontAwesomeIcon icon={transactionIcon} />
      </div>

      <div className="transaction-details">
        <div className="transaction-header">
          <div className="merchant-info">
            <span className="merchant-name">{transaction.merchant}</span>
            <span className="transaction-description">{getDisplayDescription()}</span>
          </div>
          <div className="transaction-badges">
            {transaction.status === 'pending' && (
              <span className="pending-badge">Pending</span>
            )}
            {transaction.authorizedUser && (
              <span className="authorized-badge">
                {transaction.authorizedUser}
              </span>
            )}
          </div>
        </div>

        <div className="transaction-meta">
          {transaction.authorizedUser && (
            <span className="authorized-user">{transaction.authorizedUser} • </span>
          )}
          <span className="transaction-date">{formatDate(transaction.timestamp)}</span>
          <span className="transaction-id">ID: {transaction.id}</span>
        </div>
      </div>

      <div className="transaction-amount">
        <div className="amount-value">
          <span className={`amount ${transaction.type === 'Payment' ? 'positive' : 'negative'}`}>
            {transaction.type === 'Payment' ? '+' : '-'}
            ${transaction.amount.toFixed(2)}
          </span>
        </div>
        <span className="currency-code">{transaction.currency}</span>
      </div>
    </div>
  );
};

export default TransactionItem;