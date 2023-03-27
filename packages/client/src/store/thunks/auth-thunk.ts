import { createAsyncThunk } from '@reduxjs/toolkit'
import { User, UserSignIn, UserSignUp } from '../../utils/types/user'
import { getUser, logout, signIn, signUp } from '../../utils/rest-api/auth-api'

export const onGetUser = createAsyncThunk<User, void, { rejectValue: string }>(
  'auth/onGetUser',
  async (_, { rejectWithValue }) => {
    try {
      return await getUser()
    } catch (err: any) {
      return rejectWithValue(err.message || 'Unable to get user')
    }
  }
)

export const onSignUp = createAsyncThunk<
  { id: number },
  UserSignUp,
  { rejectValue: string }
  >('auth/onSignUp', async (data, { rejectWithValue }) => {
  try {
    return await signUp(data)
  } catch (err: any) {
    return rejectWithValue(err.message || 'Unable to sign up')
  }
})

export const onSignIn = createAsyncThunk<
  void,
  UserSignIn,
  { rejectValue: string }
  >('auth/onSignIn', async (data, { dispatch, rejectWithValue }) => {
  try {
    return await signIn(data)
  } catch (err: any) {
    if (err.message === 'User already in system') {
      await dispatch(onLogout())
      return await signIn(data)
    }
    return rejectWithValue(err.message || 'Unable to sign in')
  }
})

export const onLogout = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/onLogout',
  async (_, { rejectWithValue }) => {
    try {
      return await logout()
    } catch (err: any) {
      return rejectWithValue(err.message || 'Logout error')
    }
  }
)
