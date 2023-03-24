import { createBrowserRouter } from 'react-router-dom'
import { Page404 } from '../pages/Page404'
import { Page500 } from '../pages/Page500'
import { Main } from '../pages/Main'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/404',
    element: <Page404 />,
  },
  {
    path: '/500',
    element: <Page500 />,
  },
])
