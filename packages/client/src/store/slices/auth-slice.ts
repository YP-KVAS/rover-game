import { FetchState } from './slices-types'
import { createSlice } from '@reduxjs/toolkit'
import { onGetUser, onLogout, onSignIn, onSignUp } from '../thunks/auth-thunk'

interface InitialState extends FetchState {
  isLoggedIn: boolean
}

const initialState: InitialState = {
  isLoading: false,
  errorMessage: null,
  isLoggedIn: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: state => {
      state.errorMessage = null
    },
  },
  extraReducers: builder => {
    // onGetUser
    builder
      .addCase(onGetUser.fulfilled, state => {
        state.isLoading = false
        state.errorMessage = null
        state.isLoggedIn = true
      })
      .addCase(onGetUser.pending, state => {
        state.isLoading = true
        state.errorMessage = null
      })
      .addCase(onGetUser.rejected, state => {
        state.isLoggedIn = false
        state.isLoading = false
      })

    // onSignUp
    builder
      .addCase(onSignUp.fulfilled, state => {
        state.isLoading = false
        state.errorMessage = null
        state.isLoggedIn = true
      })
      .addCase(onSignUp.pending, state => {
        state.isLoading = true
        state.errorMessage = null
      })
      .addCase(onSignUp.rejected, (state, action) => {
        state.isLoading = false
        state.errorMessage = action.payload || null
      })

    // onSignIn
    builder
      .addCase(onSignIn.fulfilled, state => {
        state.isLoading = false
        state.errorMessage = null
        state.isLoggedIn = true
      })
      .addCase(onSignIn.pending, state => {
        state.isLoading = true
        state.errorMessage = null
      })
      .addCase(onSignIn.rejected, (state, action) => {
        state.isLoading = false
        state.errorMessage = action.payload || null
      })

    // onLogout
    builder
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .addCase(onLogout.fulfilled, _ => {
        return initialState
      })
      .addCase(onLogout.pending, state => {
        state.isLoading = true
        state.errorMessage = null
      })
      .addCase(onLogout.rejected, (state, action) => {
        state.isLoading = false
        state.errorMessage = action.payload || null
      })
  },
})

export const authReducer = authSlice.reducer
export const { clearAuthError } = authSlice.actions
