import { FetchState } from './slices-types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../utils/types/user'
import {
  onAvatarChange,
  onGetUserById,
  onPasswordChange,
  onProfileSettingsChange,
} from '../thunks/user-thunk'
import { onGetUser, onLogout } from '../thunks/auth-thunk'
import { UserRolesEnum } from '../../utils/const-variables/user-roles'
import { onGetUserRole } from '../thunks/forum-thunk'

interface UserRoleState extends FetchState {
  userRole: UserRolesEnum | null
}

interface InitialState {
  user: User | null
  userRoleState: UserRoleState
  changeSettings: FetchState
  changeAvatar: FetchState
  changePassword: FetchState
  allUsers: Record<number, User | null>
}

const defaultFetchState = {
  isLoading: false,
  errorMessage: null,
}

const initialState: InitialState = {
  user: null,
  userRoleState: { ...defaultFetchState, userRole: null },
  changeSettings: defaultFetchState,
  changeAvatar: defaultFetchState,
  changePassword: defaultFetchState,
  allUsers: {},
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
    clearUserRoleErrorMessage: state => {
      state.userRoleState.errorMessage = null
    },
  },
  extraReducers: builder => {
    // onProfileSettingsChange
    builder
      .addCase(
        onProfileSettingsChange.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.changeSettings = defaultFetchState
          state.user = action.payload
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
        state.user = action.payload
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

    // onGetUserById
    builder
      .addCase(onGetUserById.fulfilled, (state, action) => {
        state.allUsers[action.meta.arg] = action.payload
      })
      .addCase(onGetUserById.rejected, (state, action) => {
        state.allUsers[action.meta.arg] = null
      })

    // onGetUserRole
    builder
      .addCase(
        onGetUserRole.fulfilled,
        (state, action: PayloadAction<{ role: UserRolesEnum }>) => {
          state.userRoleState.isLoading = false
          state.userRoleState.errorMessage = null
          state.userRoleState.userRole = action.payload.role
        }
      )
      .addCase(onGetUserRole.pending, state => {
        state.userRoleState.isLoading = true
        state.userRoleState.errorMessage = null
      })
      .addCase(onGetUserRole.rejected, (state, action) => {
        state.userRoleState.isLoading = false
        state.userRoleState.errorMessage = action.payload || null
      })

    // external auth-slice
    builder
      .addCase(onGetUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .addCase(onLogout.fulfilled, _ => {
        return initialState
      })
  },
})

export const userReducer = userSlice.reducer
export const {
  clearChangeSettingsError,
  clearChangeAvatarError,
  clearChangePasswordError,
  clearUserRoleErrorMessage,
} = userSlice.actions
