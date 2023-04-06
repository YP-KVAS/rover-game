import { FetchMethods, request } from './base-request'
import { USER_API_URL, UserApiPaths } from '../const-variables/api'
import { User, UserPassword, UserSettings } from '../types/user'

export async function changeProfileSettings(data: UserSettings): Promise<User> {
  return await request(`${USER_API_URL}${UserApiPaths.CHANGE_SETTINGS}`, {
    method: FetchMethods.PUT,
    data,
  })
}

export async function changeAvatar(avatar: File): Promise<User> {
  const formData = new FormData()
  formData.append('avatar', avatar)
  return await request(`${USER_API_URL}${UserApiPaths.CHANGE_AVATAR}`, {
    method: FetchMethods.PUT,
    data: formData,
  })
}

export async function changePassword(data: UserPassword): Promise<void> {
  return await request(`${USER_API_URL}${UserApiPaths.CHANGE_PASSWORD}`, {
    method: FetchMethods.PUT,
    data,
  })
}
