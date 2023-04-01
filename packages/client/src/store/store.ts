import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth-slice'
import { userReducer } from './slices/user-slice'

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch