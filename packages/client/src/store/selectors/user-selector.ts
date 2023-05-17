import { RootState } from '../store'

export const selectCurrentUser = (state: RootState) => state.user.user

export const selectCurrentUserId = (state: RootState) =>
  state.user.user?.id || null

export const selectCurrentUserAvatar = (state: RootState) =>
  state.user.user?.avatar

export const selectChangeSettingsState = (state: RootState) =>
  state.user.changeSettings

export const selectChangePasswordState = (state: RootState) =>
  state.user.changePassword

export const selectChangeAvatarState = (state: RootState) =>
  state.user.changeAvatar
