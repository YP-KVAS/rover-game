// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: react for ssr
import React from 'react'
import App from './src/App'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom/server'
import { IRoute, routes } from './src/router'
import { matchPath } from 'react-router-dom'
import { ThunkService } from './src/store/services/ThunkService'
import { UserService } from './src/store/services/UserService'
import { IUserRepository } from './src/store/repositories/UserRepository'
import { createStore } from './src/store/store'

const findRoute = (pathname: string, routes: Array<IRoute>) => {
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].children) {
      const route = findRoute(pathname, routes[i].children)
      if (route) {
        return route
      }
    }
    if (matchPath(routes[i].path, pathname)) {
      return routes[i]
    }
  }
}

export async function render(url: string, userRepository: IUserRepository) {
  const service = new ThunkService(new UserService(userRepository))
  const store = createStore(service)

  const pathname = url.replace(/\/$/, '').split('?')[0] || '/'
  const currentRoute = findRoute(pathname, routes)

  if (currentRoute?.loader) {
    await currentRoute.loader(store.dispatch)
  }

  const initialState = store.getState()

  const renderResult = renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>
  )

  return [initialState, renderResult]
}
