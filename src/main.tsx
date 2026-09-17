import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import './styles/base.css'
import './styles/nav.css'
import './styles/cursor.css'
import './styles/chrome.css'
import './styles/home-hero.css'
import './styles/home.css'
import './styles/notfound.css'

// base './' (для деплоя в подкаталог) даёт BASE_URL './' — роутеру нужен '/'
const basename = import.meta.env.BASE_URL.replace(/^\.\//, '/')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
