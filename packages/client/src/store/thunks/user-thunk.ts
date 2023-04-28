import { createAsyncThunk } from '@reduxjs/toolkit'
import { UserSettings, User, IUserPassword } from '../../utils/types/user'
import {
  changeAvatar,
  changePassword,
  changeProfileSettings,
  getUserById,
} from '../../utils/rest-api/user-api'
import { RootState } from '../store'

export const onProfileSettingsChange = createAsyncThunk<
  User,
  UserSettings,
  { rejectValue: string }
>('user/onProfileSettingsChange', async (data, { rejectWithValue }) => {
  try {
    return await changeProfileSettings(data)
  } catch (err: unknown) {
    return rejectWithValue(
      (err as Error).message || 'Unable to  change settings'
    )
  }
})

export const onAvatarChange = createAsyncThunk<
  User,
  File,
  { rejectValue: string }
>('user/onAvatarChange', async (file, { rejectWithValue }) => {
  try {
    return await changeAvatar(file)
  } catch (err: unknown) {
    return rejectWithValue((err as Error).message || 'Unable to  change avatar')
  }
})

export const onPasswordChange = createAsyncThunk<
  void,
  IUserPassword,
  { rejectValue: string }
>('user/onPasswordChange', async (data, { rejectWithValue }) => {
  try {
    return await changePassword(data)
  } catch (err: unknown) {
    return rejectWithValue(
      (err as Error).message || 'Unable to  change password'
    )
  }
})

export const onGetUserById = createAsyncThunk<
  User,
  number,
  { rejectValue: string }
>(
  'user/onGetUserById',
  async (userId, { rejectWithValue }) => {
    try {
      return await getUserById(userId)
    } catch (err: unknown) {
      return rejectWithValue(
        (err as Error).message || 'Не удалось получить данные пользователя'
      )
    }
  },
  {
    condition: (userId: number, { getState }) => {
      const state = getState() as RootState
      const userIsLoading = state.user.allUsers[userId]?.isLoading
      if (userIsLoading) {
        return false
      }
    },
  }
)
