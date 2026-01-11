import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { getCurrencyIcon } from '../utils/iconUtils';
import { useState } from 'react';
import './BalanceCard.css';

// Локальні типи для цього компонента
interface Balance {
  currency: string;
  amount: number;
  symbol: string;
}

interface BalanceCardProps {
  balance: Balance;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="balance-card">
      <div className="balance-header">
        <div className="currency-info">
          <FontAwesomeIcon
            icon={getCurrencyIcon(balance.currency)}
            className="currency-icon"
          />
          <span className="currency-name">{balance.currency}</span>
        </div>
        <button
          className="visibility-toggle"
          onClick={toggleVisibility}
          title={isVisible ? 'Hide balance' : 'Show balance'}
        >
          <FontAwesomeIcon icon={isVisible ? faEye : faEyeSlash} />
        </button>
      </div>

      <div className="balance-amount">
        {isVisible ? (
          <>
            <span className="symbol">{balance.symbol}</span>
            <span className="amount">{balance.amount.toLocaleString()}</span>
          </>
        ) : (
          <span className="hidden-amount">••••••</span>
        )}
      </div>
    </div>
  );
};

export default BalanceCard;