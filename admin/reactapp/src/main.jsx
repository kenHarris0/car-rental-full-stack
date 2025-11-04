import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import './main.css'
import Context from './Context/Context.jsx'
createRoot(document.getElementById('root')).render(
  <Context>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Context>
)
