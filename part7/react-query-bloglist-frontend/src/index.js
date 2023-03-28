import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { NotificationContextProvider } from './reducers/NotificationContext'
import { BlogsContextProvider } from './reducers/BlogsContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BlogsContextProvider>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </BlogsContextProvider>
)