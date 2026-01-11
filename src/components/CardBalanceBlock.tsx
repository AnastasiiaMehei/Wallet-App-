import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import './CardBalanceBlock.css';

// Локальні типи для цього компонента
interface Card {
  limit: number;
  balance: number;
  available: number;
}

interface CardBalanceBlockProps {
  card: Card;
}

const CardBalanceBlock: React.FC<CardBalanceBlockProps> = ({ card }) => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="card-balance-block">
      <div className="card-header">
        <div className="card-icon">
          <FontAwesomeIcon icon={faCreditCard} />
        </div>
        <h3>Credit Card</h3>
        <button
          className="visibility-toggle"
          onClick={toggleVisibility}
          title={isVisible ? 'Hide amounts' : 'Show amounts'}
        >
          <FontAwesomeIcon icon={isVisible ? faEye : faEyeSlash} />
        </button>
      </div>

      <div className="card-details">
        <div className="detail-row">
          <span className="label">Card Limit:</span>
          <span className="value limit">{formatCurrency(card.limit)}</span>
        </div>

        <div className="detail-row">
          <span className="label">Card Balance:</span>
          <span className={`value balance ${isVisible ? '' : 'hidden'}`}>
            {isVisible ? formatCurrency(card.balance) : '••••••'}
          </span>
        </div>

        <div className="detail-row available">
          <span className="label">Available:</span>
          <span className={`value available-amount ${isVisible ? '' : 'hidden'}`}>
            {isVisible ? formatCurrency(card.available) : '••••••'}
          </span>
        </div>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${(card.balance / card.limit) * 100}%` }}
        ></div>
      </div>

      <div className="usage-text">
        {((card.balance / card.limit) * 100).toFixed(1)}% used
      </div>
    </div>
  );
};

export default CardBalanceBlock;