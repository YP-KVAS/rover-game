import { RoutesEnum } from '../utils/const-variables/routes'
import { createBrowserRouter, Link, redirect } from 'react-router-dom'
import { Page404 } from '../pages/Page404'
import { Page500 } from '../pages/Page500'
import { Main } from '../pages/Main'
import { GamePage } from '../pages/GamePage/GamePage'
import { Layout } from '../components/Layout/Layout'
import { Start } from '../pages/Start/Start'
import { Registration } from '../pages/Registration'
import { UserSettings } from '../pages/UserSettings'
import { store } from '../store/store'
import { Login } from '../pages/Login'
import { Forum } from '../pages/Forum/Forum'
import { ForumCategory } from '../pages/Forum/ForumCategory'

const in_work_component = (
  <main>
    <h2>PAGE IN WORK</h2>
    <Link to={RoutesEnum.MAIN}>Return</Link>
  </main>
)

function check_auth() {
  const auth = store.getState().auth.isLoggedIn

  return auth ? null : redirect(RoutesEnum.MAIN)
}

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
        loader: check_auth,
      },
      {
        path: RoutesEnum.FORUM,
        element: <Forum />,
      },
      {
        path: RoutesEnum.FORUM_CATEGORY,
        element: <ForumCategory />,
      },
      {
        path: RoutesEnum.START,
        element: <Start />,
      },
      {
        path: RoutesEnum.GAME,
        element: <GamePage />,
        // TODO: add auth check
        //loader: check_auth,
      },
      {
        path: RoutesEnum.LEADERBOARD,
        element: in_work_component,
        loader: check_auth,
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
