import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import Store from './store/userStore'
import App from './App.jsx'
import './index.css'

export const Context = createContext(null)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Context.Provider value={{
    store: new Store(),
  }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>
)
