import { createBrowserRouter, Link, redirect } from 'react-router-dom'
import { Page404 } from '../pages/Page404'
import { Page500 } from '../pages/Page500'
import { Main } from '../pages/Main'
import { GamePage } from '../pages/GamePage'
import { RoutesEnum } from '../utils/const-variables/routes'

const in_work_component = (
  <main>
    <h2>PAGE IN WORK</h2>
    <Link to={RoutesEnum.MAIN}>Return</Link>
  </main>
)

function check_auth() {
  // TODO: replace with real checkAuth function
  const auth = true

  return auth ? null : redirect(RoutesEnum.MAIN)
}

export const router = createBrowserRouter([
  {
    path: RoutesEnum.MAIN,
    element: <Main />,
  },
  {
    path: RoutesEnum.REGISTRATION,
    element: in_work_component,
  },
  {
    path: RoutesEnum.LOGIN,
    element: in_work_component,
  },
  {
    path: RoutesEnum.USER_SETTINGS,
    element: in_work_component,
    loader: check_auth,
  },
  {
    path: RoutesEnum.FORUM,
    element: in_work_component,
  },
  {
    path: RoutesEnum.GAME,
    element: <GamePage />,
    loader: check_auth,
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
])
