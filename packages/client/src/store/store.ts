import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth-slice'
import { userReducer } from './slices/user-slice'
import { leaderboardReducer } from './slices/leaderboard-slice'
import { IThunkService } from './services/ThunkService'

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  leaderboard: leaderboardReducer,
})

export const createStore = (
  service?: IThunkService,
  preloadedState?: object
) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: service,
        },
      })
    },
    devTools: process.env.NODE_ENV !== 'production',
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ReturnType<typeof createStore>['dispatch']
