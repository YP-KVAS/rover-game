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
import { AppDispatch } from '../store/store'
import { PayloadAction } from '@reduxjs/toolkit'
import { onGetUser } from '../store/thunks/auth-thunk'

export interface IRoute {
  path: RoutesEnum | string
  element: JSX.Element
  loader?: (dispatch: AppDispatch) => Promise<PayloadAction<unknown>>
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
        loader: (dispatch: AppDispatch) => {
          return dispatch(onGetUser())
        },
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
            loader: (dispatch: AppDispatch) => {
              return dispatch(onGetUser())
            },
          },
          {
            path: RoutesEnum.FORUM_CATEGORY,
            element: <p>Topics. Coming soon...</p>,
            loader: (dispatch: AppDispatch) => {
              return dispatch(onGetUser())
            },
          },
          {
            path: RoutesEnum.FORUM_TOPIC,
            element: <p>Comments. Coming soon...</p>,
            loader: (dispatch: AppDispatch) => {
              return dispatch(onGetUser())
            },
          },
        ],
      },
      {
        path: RoutesEnum.START,
        element: <Start />,
        loader: (dispatch: AppDispatch) => {
          return dispatch(onGetUser())
        },
      },
      {
        path: RoutesEnum.GAME,
        element: <GamePage />,
        loader: (dispatch: AppDispatch) => {
          return dispatch(onGetUser())
        },
      },
      {
        path: RoutesEnum.LEADERBOARD,
        element: <Leaderboard />,
        loader: (dispatch: AppDispatch) => {
          return dispatch(onGetUser())
        },
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
