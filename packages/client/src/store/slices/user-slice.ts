import { FetchState } from './slices-types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../utils/types/user'
import {
  onAvatarChange,
  onPasswordChange,
  onProfileSettingsChange,
} from '../thunks/user-thunk'
import { onGetUser, onLogout } from '../thunks/auth-thunk'

interface InitialState {
  user: User | null
  changeSettings: FetchState
  changeAvatar: FetchState
  changePassword: FetchState
}

const defaultFetchState = {
  isLoading: false,
  errorMessage: null,
}

const initialState: InitialState = {
  user: null,
  changeSettings: defaultFetchState,
  changeAvatar: defaultFetchState,
  changePassword: defaultFetchState,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        onProfileSettingsChange.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.changeSettings.isLoading = false
          state.changeSettings.errorMessage = null
          state.user = action.payload
        }
      )
      .addCase(onProfileSettingsChange.pending, state => {
        state.changeSettings.isLoading = true
        state.changeSettings.errorMessage = null
      })
      .addCase(onProfileSettingsChange.rejected, (state, action) => {
        state.changeSettings.isLoading = false
        state.changeSettings.errorMessage = action.payload!
      })
    builder
      .addCase(onAvatarChange.fulfilled, (state, action) => {
        state.changeAvatar.isLoading = false
        state.changeAvatar.errorMessage = null
        state.user = action.payload
      })
      .addCase(onAvatarChange.pending, state => {
        state.changeAvatar.isLoading = true
        state.changeAvatar.errorMessage = null
      })
      .addCase(onAvatarChange.rejected, (state, action) => {
        state.changeAvatar.isLoading = false
        state.changeAvatar.errorMessage = action.payload!
      })
    builder
      .addCase(onPasswordChange.fulfilled, state => {
        state.changePassword.isLoading = false
        state.changePassword.errorMessage = null
      })
      .addCase(onPasswordChange.pending, state => {
        state.changePassword.isLoading = true
        state.changePassword.errorMessage = null
      })
      .addCase(onPasswordChange.rejected, (state, action) => {
        state.changePassword.isLoading = false
        state.changePassword.errorMessage = action.payload!
      })
    builder
      .addCase(onGetUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload
      })
      .addCase(onLogout.fulfilled, _ => {
        return initialState
      })
  },
})

export const userReducer = userSlice.reducer
