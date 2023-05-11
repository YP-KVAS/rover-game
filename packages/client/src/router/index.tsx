import { Outlet } from 'react-router-dom'
import { Page404 } from '../pages/Page404'
import { Page500 } from '../pages/Page500'
import { Main } from '../pages/MainPage/Main'
import { RoutesEnum } from '../utils/const-variables/routes'
import { GamePage } from '../pages/GamePage/GamePage'
import { Layout } from '../components/Layout/Layout'
import { Start } from '../pages/Start/Start'
import { Registration } from '../pages/Registration'
import { Leaderboard } from '../pages/Leaderboard/Leaderboard'
import { UserSettings } from '../pages/UserSettings'
import { Login } from '../pages/Login'

export interface IRoute {
  path: RoutesEnum | string
  element: JSX.Element
  children?: Array<IRoute>
}

export const routes: Array<IRoute> = [
  {
    element: <Layout />,
    path: RoutesEnum.MAIN,
    children: [
      {
        path: RoutesEnum.MAIN,
        element: <Main />,
      },
      {
        path: RoutesEnum.REGISTRATION,
        element: <Registration />,
      },
      {
        path: RoutesEnum.LOGIN,
        element: <Login />,
      },
      {
        path: RoutesEnum.USER_SETTINGS,
        element: <UserSettings />,
      },
      {
        path: RoutesEnum.FORUM,
        element: (
          <div>
            <p>Forum. Coming soon...</p>
            <Outlet />
          </div>
        ),
        children: [
          {
            path: RoutesEnum.FORUM,
            element: <p>Categories. Coming soon...</p>,
          },
          {
            path: RoutesEnum.FORUM_CATEGORY,
            element: <p>Topics. Coming soon...</p>,
          },
          {
            path: RoutesEnum.FORUM_TOPIC,
            element: <p>Comments. Coming soon...</p>,
          },
        ],
      },
      {
        path: RoutesEnum.START,
        element: <Start />,
      },
      {
        path: RoutesEnum.GAME,
        element: <GamePage />,
      },
      {
        path: RoutesEnum.LEADERBOARD,
        element: <Leaderboard />,
      },
      {
        path: RoutesEnum.ERROR_500,
        element: <Page500 />,
      },
      {
        path: '*',
        element: <Page404 />,
      },
    ],
  },
]
