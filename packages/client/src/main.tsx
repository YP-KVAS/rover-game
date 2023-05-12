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

const startServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log(
            'ServiceWorker успешно зарегистрирован: ',
            registration.scope
          )
        })
        .catch((error: string) => {
          console.log('Регистрация ServiceWorker завершилась ошибкой: ', error)
        })
    })
  }
}

startServiceWorker()

const service = new ThunkService(new UserService(new UserRepository()))

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
