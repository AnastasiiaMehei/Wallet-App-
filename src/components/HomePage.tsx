import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet, faCoins, faHistory, faCog } from '@fortawesome/free-solid-svg-icons'
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
import BalanceCard from './BalanceCard'
import TransactionItem from './TransactionItem'
import '../App.css'

const HomePage: React.FC = () => {
  const [walletData, setWalletData] = useState<WalletData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

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

  const handleViewAllTransactions = () => {
    navigate('/transactions')
  }

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <FontAwesomeIcon icon={faCoins} spin size="2x" />
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">
          <FontAwesomeIcon icon={faWallet} size="2x" />
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <FontAwesomeIcon icon={faWallet} className="wallet-icon" />
          <h1>Wallet App</h1>
          <p className="user-info">
            Welcome, {walletData?.user.name}!
          </p>
        </div>
      </header>

      <main className="app-main">
        <section className="balances-section">
          <h2>
            <FontAwesomeIcon icon={faCoins} />
            Balances
          </h2>
          <div className="balances-grid">
            {walletData?.balances.map((balance) => (
              <BalanceCard key={balance.currency} balance={balance} />
            ))}
          </div>
        </section>

        <section className="transactions-section">
          <div className="transactions-header">
            <h2>
              <FontAwesomeIcon icon={faHistory} />
              Recent transactions
            </h2>
            <button className="view-all-btn" onClick={handleViewAllTransactions}>
              View all
            </button>
          </div>
          <div className="transactions-list">
            {walletData?.transactions.slice(0, 3).map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </section>

        <section className="quick-actions">
          <h2>Quick actions</h2>
          <div className="actions-grid">
            <button className="action-btn">
              <FontAwesomeIcon icon={faWallet} />
              <span>Top up</span>
            </button>
            <button className="action-btn">
              <FontAwesomeIcon icon={faCoins} />
              <span>Transfer</span>
            </button>
            <button className="action-btn" onClick={handleViewAllTransactions}>
              <FontAwesomeIcon icon={faHistory} />
              <span>History</span>
            </button>
            <button className="action-btn">
              <FontAwesomeIcon icon={faCog} />
              <span>Settings</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage