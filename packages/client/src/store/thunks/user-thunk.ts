import { createAsyncThunk } from '@reduxjs/toolkit'
import { UserSettings, User, UserPassword } from '../../utils/types/user'
import {
  changeAvatar,
  changePassword,
  changeProfileSettings,
} from '../../utils/rest-api/user-api'

export const onProfileSettingsChange = createAsyncThunk<
  User,
  UserSettings,
  { rejectValue: string }
>('user/onProfileSettingsChange', async (data, { rejectWithValue }) => {
  try {
    return await changeProfileSettings(data)
  } catch (err: any) {
    return rejectWithValue(err.message || 'Unable to  change settings')
  }
})

export const onAvatarChange = createAsyncThunk<
  User,
  File,
  { rejectValue: string }
>('user/onAvatarChange', async (file, { rejectWithValue }) => {
  try {
    return await changeAvatar(file)
  } catch (err: any) {
    return rejectWithValue(err.message || 'Unable to  change avatar')
  }
})

export const onPasswordChange = createAsyncThunk<
  void,
  UserPassword,
  { rejectValue: string }
>('user/onPasswordChange', async (data, { rejectWithValue }) => {
  try {
    return await changePassword(data)
  } catch (err: any) {
    return rejectWithValue(err.message || 'Unable to  change password')
  }
})
