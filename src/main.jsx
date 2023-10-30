import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ProviderTierList } from './context/contextTierList.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProviderTierList>

    <App />
    </ProviderTierList>
  </React.StrictMode>,
)
