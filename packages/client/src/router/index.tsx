import { createBrowserRouter, Link } from 'react-router-dom'
import { Page404 } from '../pages/Page404'
import { Page500 } from '../pages/Page500'
import { Main } from '../pages/Main'
import { RoutesEnum } from '../utils/const-variables/routes'

const in_work_component = (
  <main>
    <h2>PAGE IN WORK</h2>
    <Link to={RoutesEnum.MAIN}>Return</Link>
  </main>
)

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
  },
  {
    path: RoutesEnum.FORUM,
    element: in_work_component,
  },
  {
    path: RoutesEnum.GAME,
    element: in_work_component,
  },
  {
    path: RoutesEnum.LEADERBOARD,
    element: in_work_component,
  },
  {
    path: RoutesEnum.ERROR_404,
    element: <Page404 />,
  },
  {
    path: RoutesEnum.ERROR_500,
    element: <Page500 />,
  },
])
