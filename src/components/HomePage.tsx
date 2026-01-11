import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { loadWalletData } from '../utils/dataLoader'


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
import TransactionItem from './TransactionItem'
import './HomePage.css'

const HomePage: React.FC = () => {
  const [walletData, setWalletData] = useState<WalletData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadWalletData()
        setWalletData(data)
      } catch (err) {
        setError('Error loading data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])


  if (loading) {
    return (
      <div className="homepage">
        <div className="loading">
          <FontAwesomeIcon icon={faCheck} spin size="2x" />
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="homepage">
        <div className="error">
          <FontAwesomeIcon icon={faCheck} size="2x" />
          <p>{error}</p>
        </div>
      </div>
    )
  }

  const cardBalance = walletData?.card?.balance || 0;
  const cardLimit = 1500;
  const availableAmount = cardLimit - cardBalance;
  const dailyPoints = walletData?.dailyPoints || 0;

  return (
    <div className="homepage">
      <div className="top-section">
        {/* Лівий верхній кут - Card Balance */}
        <div className="card-balance-section">
          <h2 className="section-title">Card Balance</h2>
          <div className="balance-amount">${cardBalance.toFixed(2)}</div>
          <div className="available-amount">${availableAmount.toFixed(2)} Available</div>
        </div>

        {/* Правий верхній кут - No Payment Due */}
        <div className="payment-status-section">
          <h2 className="section-title">No Payment Due</h2>
          <div className="payment-message">September balance.</div>
        </div>
      </div>

      {/* Daily Points секція */}
      <div className="daily-points-section">
        <div className="daily-points-content">
          <div className="daily-points-left">
            <h3 className="daily-points-title">Daily points</h3>
            <div className="points-amount">{dailyPoints}</div>
          </div>
          <div className="daily-points-right">
            <div className="points-checkmark">
              <FontAwesomeIcon icon={faCheck} />
            </div>
          </div>
        </div>
      </div>

      {/* Latest Transactions секція */}
      <div className="latest-transactions-section">
        <h2 className="transactions-title">Latest Transactions</h2>
        <div className="transactions-list">
          {walletData?.transactions.slice(0, 10).map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage