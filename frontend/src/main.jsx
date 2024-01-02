import React from 'react'
import ReactDOM from 'react-dom/client'
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import StoreProvider from './Store.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <BrowserRouter>
          <PayPalScriptProvider deferLoading={true}>
            <App />
          </PayPalScriptProvider>
        </BrowserRouter>
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>,
)
