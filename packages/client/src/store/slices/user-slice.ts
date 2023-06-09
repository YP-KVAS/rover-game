import { FetchState } from './slices-types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, UserExtended, UserScore } from '../../utils/types/user'
import {
  onAvatarChange,
  onPasswordChange,
  onProfileSettingsChange,
} from '../thunks/user-thunk'
import { onGetUser, onLogout } from '../thunks/auth-thunk'
import { UserRolesEnum } from '../../utils/const-variables/user-roles'
import { onScoreUpdate } from '../thunks/leaderboard-thunk'

interface InitialState {
  user: UserExtended | null
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
  reducers: {
    clearChangeSettingsError: state => {
      state.changeSettings.errorMessage = null
    },
    clearChangeAvatarError: state => {
      state.changeAvatar.errorMessage = null
    },
    clearChangePasswordError: state => {
      state.changePassword.errorMessage = null
    },
  },
  extraReducers: builder => {
    // onProfileSettingsChange
    builder
      .addCase(
        onProfileSettingsChange.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.changeSettings = defaultFetchState
          const role = state.user?.role
          const best_score = state.user?.best_score || null
          state.user = {
            ...action.payload,
            role: role || UserRolesEnum.REGULAR,
            best_score,
          }
        }
      )
      .addCase(onProfileSettingsChange.pending, state => {
        state.changeSettings.isLoading = true
        state.changeSettings.errorMessage = null
      })
      .addCase(onProfileSettingsChange.rejected, (state, action) => {
        state.changeSettings.isLoading = false
        state.changeSettings.errorMessage = action.payload || null
      })

    // onAvatarChange
    builder
      .addCase(onAvatarChange.fulfilled, (state, action) => {
        state.changeAvatar = defaultFetchState
        const role = state.user?.role
        const best_score = state.user?.best_score || null
        state.user = {
          ...action.payload,
          role: role || UserRolesEnum.REGULAR,
          best_score,
        }
      })
      .addCase(onAvatarChange.pending, state => {
        state.changeAvatar.isLoading = true
        state.changeAvatar.errorMessage = null
      })
      .addCase(onAvatarChange.rejected, (state, action) => {
        state.changeAvatar.isLoading = false
        state.changeAvatar.errorMessage = action.payload || null
      })

    // onPasswordChange
    builder
      .addCase(onPasswordChange.fulfilled, state => {
        state.changePassword = defaultFetchState
      })
      .addCase(onPasswordChange.pending, state => {
        state.changePassword.isLoading = true
        state.changePassword.errorMessage = null
      })
      .addCase(onPasswordChange.rejected, (state, action) => {
        state.changePassword.isLoading = false
        state.changePassword.errorMessage = action.payload || null
      })

    // external auth-slice
    builder
      .addCase(
        onGetUser.fulfilled,
        (state, action: PayloadAction<UserExtended>) => {
          state.user = action.payload
        }
      )
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .addCase(onLogout.fulfilled, _ => {
        return initialState
      })

    // external leaderboard slice
    builder.addCase(
      onScoreUpdate.fulfilled,
      (state, action: PayloadAction<UserScore>) => {
        if (state.user) {
          state.user.best_score = action.payload.best_score
        }
      }
    )
  },
})

export const userReducer = userSlice.reducer
export const {
  clearChangeSettingsError,
  clearChangeAvatarError,
  clearChangePasswordError,
} = userSlice.actions
