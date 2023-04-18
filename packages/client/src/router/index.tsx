import { createBrowserRouter, Link } from 'react-router-dom'
import { Page404 } from '../pages/Page404'
import { Page500 } from '../pages/Page500'
import { Main } from '../pages/MainPage/Main'
import { RoutesEnum } from '../utils/const-variables/routes'
import { GamePage } from '../pages/GamePage/GamePage'
import { Layout } from '../components/Layout/Layout'
import { Start } from '../pages/Start/Start'
import { Registration } from '../pages/Registration'
import { UserSettings } from '../pages/UserSettings'
import { Login } from '../pages/Login'

const in_work_component = (
  <main>
    <h2>PAGE IN WORK</h2>
    <Link to={RoutesEnum.MAIN}>Return</Link>
  </main>
)

export const router = createBrowserRouter([
  {
    element: <Layout />,
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
        element: in_work_component,
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
        element: in_work_component,
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
])
