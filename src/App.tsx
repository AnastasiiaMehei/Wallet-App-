import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import TransactionsList from './components/TransactionsList'
import TransactionDetail from './components/TransactionDetail'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/transactions" element={<TransactionsList />} />
        <Route path="/transaction/:id" element={<TransactionDetail />} />
      </Routes>
    </Router>
  )
}

export default App
