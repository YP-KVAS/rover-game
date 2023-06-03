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
import { ForumService } from './src/store/services/ForumService'
import { IForumRepository } from './src/store/repositories/ForumRepository'
import { PayloadAction } from '@reduxjs/toolkit'
import { ILeaderboardRepository } from './src/store/repositories/LeaderboardRepository'
import { LeaderboardService } from './src/store/services/LeaderboadService'

const findRoute = (pathname: string, routes: IRoute[]) => {
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

export async function render(
  url: string,
  userRepository: IUserRepository,
  forumRepository: IForumRepository,
  leaderboardRepository: ILeaderboardRepository
) {
  const service = new ThunkService(
    new UserService(userRepository),
    new ForumService(forumRepository),
    new LeaderboardService(leaderboardRepository)
  )
  const store = createStore(service)

  const [pathname, searchStr] = url.replace(/\/$/, '').split('?')
  const currentPath = pathname || '/'
  const currentRoute = findRoute(currentPath, routes)

  const searchParams = Object.fromEntries(new URLSearchParams(searchStr))

  if (currentRoute?.loader) {
    const actions: Promise<PayloadAction<unknown>>[] = currentRoute.loader(
      store.dispatch,
      currentPath,
      searchParams
    )
    await Promise.all(actions)
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
