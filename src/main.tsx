import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css' // Тимчасово відключено
import './utils/fontawesome' // Ініціалізація FontAwesome
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
