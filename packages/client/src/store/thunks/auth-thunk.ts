import { createAsyncThunk } from '@reduxjs/toolkit'
import { User, UserSignIn, UserSignUp } from '../../utils/types/user'
import { getUser, logout, signIn, signUp } from '../../utils/rest-api/auth-api'
import { RootState } from '../store'

export const onGetUser = createAsyncThunk<User, void, { rejectValue: string }>(
  'auth/onGetUser',
  async (_, { rejectWithValue }) => {
    try {
      return await getUser()
    } catch (err: unknown) {
      return rejectWithValue((err as Error).message || 'Unable to get user')
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState
      const userIsLoading = state.auth.isLoading
      if (userIsLoading) {
        return false
      }
    },
  }
)

export const onSignUp = createAsyncThunk<
  { id: number },
  UserSignUp,
  { rejectValue: string }
>('auth/onSignUp', async (data, { rejectWithValue }) => {
  try {
    return await signUp(data)
  } catch (err: unknown) {
    return rejectWithValue((err as Error).message || 'Unable to sign up')
  }
})

export const onSignIn = createAsyncThunk<
  void,
  UserSignIn,
  { rejectValue: string }
>('auth/onSignIn', async (data, { dispatch, rejectWithValue }) => {
  try {
    return await signIn(data)
  } catch (err: unknown) {
    if ((err as Error).message === 'User already in system') {
      await dispatch(onLogout())
      return await signIn(data)
    }
    return rejectWithValue((err as Error).message || 'Unable to sign in')
  }
})

export const onLogout = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/onLogout',
  async (_, { rejectWithValue }) => {
    try {
      return await logout()
    } catch (err: unknown) {
      return rejectWithValue((err as Error).message || 'Logout error')
    }
  }
)
