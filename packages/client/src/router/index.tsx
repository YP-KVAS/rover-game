import { Page404 } from '../pages/Page404'
import { Page500 } from '../pages/Page500'
import { Main } from '../pages/MainPage/Main'
import { PAGE_QUERY, RoutesEnum } from '../utils/const-variables/routes'
import { GamePage } from '../pages/GamePage/GamePage'
import { Layout } from '../components/Layout/Layout'
import { Registration } from '../pages/Registration'
import { Leaderboard } from '../pages/Leaderboard/Leaderboard'
import { UserSettings } from '../pages/UserSettings'
import { Login } from '../pages/Login'
import { AppDispatch } from '../store/store'
import { PayloadAction } from '@reduxjs/toolkit'
import { onGetUser } from '../store/thunks/auth-thunk'
import { ForumCategories } from '../pages/Forum/ForumCategories'
import { ForumTopics } from '../pages/Forum/ForumTopics'
import { ForumLayout } from '../pages/Forum/ForumLayout'
import { ForumComments } from '../pages/Forum/ForumComments'
import {
  onGetForumCategories,
  onGetForumComments,
  onGetForumTopics,
} from '../store/thunks/forum-thunk'
import { COMMENTS_LOAD_LIMIT } from '../utils/const-variables/api'

export interface IRoute {
  path: RoutesEnum | string
  element: JSX.Element
  loader?: (
    dispatch: AppDispatch,
    pathname: string,
    searchParams: Record<string, unknown>
  ) => Promise<PayloadAction<unknown>>[]
  children?: IRoute[]
}

export const routes: IRoute[] = [
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
          return [dispatch(onGetUser())]
        },
      },
      {
        path: RoutesEnum.FORUM,
        element: <ForumLayout />,
        children: [
          {
            path: RoutesEnum.FORUM,
            element: <ForumCategories />,
            loader: (dispatch: AppDispatch) => {
              return [dispatch(onGetUser()), dispatch(onGetForumCategories())]
            },
          },
          {
            path: RoutesEnum.FORUM_CATEGORY,
            element: <ForumTopics />,
            loader: (dispatch: AppDispatch, pathname: string) => {
              const actions: Promise<PayloadAction<unknown>>[] = [
                dispatch(onGetUser()),
                dispatch(onGetForumCategories()),
              ]
              const categoryId = pathname.split('/')[2]
              const intCategoryId = parseInt(categoryId)

              if (!isNaN(intCategoryId)) {
                actions.push(
                  dispatch(onGetForumTopics({ categoryId: intCategoryId }))
                )
              }

              return actions
            },
          },
          {
            path: RoutesEnum.FORUM_TOPIC,
            element: <ForumComments />,
            loader: (
              dispatch: AppDispatch,
              pathname: string,
              searchParams: Record<string, unknown>
            ) => {
              const actions: Promise<PayloadAction<unknown>>[] = [
                dispatch(onGetUser()),
                dispatch(onGetForumCategories()),
              ]

              const [topicId, categoryId] = pathname.split('/').reverse()
              const intCategoryId = parseInt(categoryId)
              const intTopicId = parseInt(topicId)

              if (!isNaN(intCategoryId) && !isNaN(intTopicId)) {
                const page = searchParams[PAGE_QUERY]
                let intPage = parseInt(page as string)
                if (isNaN(intPage)) {
                  intPage = 1
                }

                const offset = (intPage - 1) * COMMENTS_LOAD_LIMIT

                actions.push(
                  dispatch(onGetForumTopics({ categoryId: intCategoryId }))
                )
                actions.push(
                  dispatch(
                    onGetForumComments({
                      topicId: intTopicId,
                      parentCommentId: null,
                      limit: COMMENTS_LOAD_LIMIT,
                      offset,
                    })
                  )
                )
              }

              return actions
            },
          },
        ],
      },
      {
        path: RoutesEnum.GAME,
        element: <GamePage />,
        loader: (dispatch: AppDispatch) => {
          return [dispatch(onGetUser())]
        },
      },
      {
        path: RoutesEnum.LEADERBOARD,
        element: <Leaderboard />,
        loader: (dispatch: AppDispatch) => {
          return [dispatch(onGetUser())]
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
