import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThunkService } from './store/services/ThunkService'
import { UserService } from './store/services/UserService'
import { UserRepository } from './store/repositories/UserRepository'
import { createStore } from './store/store'
import { ForumService } from './store/services/ForumService'
import { ForumRepository } from './store/repositories/ForumRepository'

const service = new ThunkService(
  new UserService(new UserRepository()),
  new ForumService(new ForumRepository())
)

const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__

const store = createStore(service, preloadedState)

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
