import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import TopBar from '@components/TopBar/TopBar'

import { CurrentUserProvider } from '@contexts/currentUser'
import CurrentUserChecker from '@components/CurrentUserChecker/CurrentUserChecker'
import Routes from './routes'
import './styles/global.scss'

const App = () => (
  <CurrentUserProvider>
    <CurrentUserChecker>
      <Router>
        <TopBar />
        <Routes />
      </Router>
    </CurrentUserChecker>
  </CurrentUserProvider>
)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
