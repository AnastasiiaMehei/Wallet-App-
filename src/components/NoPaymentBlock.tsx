import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './NoPaymentBlock.css';
import './NoPaymentBlock.css';

const NoPaymentBlock: React.FC = () => {
  return (
    <div className="no-payment-block">
      <div className="payment-icon">
        <FontAwesomeIcon icon={faCheckCircle} />
      </div>
      <div className="payment-content">
        <h3>Payment Status</h3>
        <p>Ви сплатили свій баланс.</p>
      </div>
    </div>
  );
};

export default NoPaymentBlock;