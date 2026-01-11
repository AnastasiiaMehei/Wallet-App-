import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faClock, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { loadWalletData } from '../utils/dataLoader';
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
          setError('Transaction not found');
        }
      } catch (err) {
        setError('Error loading data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);




  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}.${month}.${year}, ${hours}:${minutes}`;
  };



  if (loading) {
    return (
      <div className="transaction-detail-page">
        <div className="loading">
          <FontAwesomeIcon icon={faClock} spin size="2x" />
          <p>Loading transaction details...</p>
        </div>
      </div>
    );
  }

  if (error || !transaction) {
    return (
      <div className="transaction-detail-page">
        <div className="error">
          <FontAwesomeIcon icon={faTimesCircle} size="2x" />
          <p>{error || 'Transaction not found'}</p>
          <button className="back-btn" onClick={() => navigate('/transactions')}>
            Return to list
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="transaction-detail-page">
      {/* Верхній лівий кут - блакитна стрілочка для повернення */}
      <header className="detail-header">
        <button className="back-arrow" onClick={() => navigate('/')}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                  
        </button>
      </header>

      {/* Центральний div з сумою, типом і датою */}
      <div className="transaction-main-info">
        <div className="transaction-amount-large">
          ${transaction.amount.toFixed(2)}
        </div>
        <div className="transaction-type-info">
          {transaction.merchant}
        </div>
        <div className="transaction-date-time">
          {formatDateTime(transaction.timestamp)}
        </div>
      </div>

      {/* Нижній div зі статусом, карткою і Total */}
      <div className="transaction-details-section">
        <div className="transaction-status">
          Status: {transaction.status === 'pending' ? 'Pending' : 'Approved'}
        </div>
        <div className="transaction-card-info">
          RBC Bank Debit Card
        </div>

        <div className="transaction-total">
          <span className="total-label">Total</span>
          <span className="total-amount">${transaction.amount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;