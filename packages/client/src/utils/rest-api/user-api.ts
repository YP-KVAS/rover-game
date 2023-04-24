import { FetchMethods, request } from './base-request'
import {
  BASE_SERVER_URL,
  BASE_YA_URL,
  USER_API_URL,
  UserApiPaths,
  USERS_API_URL,
} from '../const-variables/api'
import { IUserPassword, User, UserSettings } from '../types/user'
import { UserRolesEnum } from '../const-variables/user-roles'

export async function changeProfileSettings(data: UserSettings): Promise<User> {
  return await request(
    BASE_YA_URL,
    `${USER_API_URL}${UserApiPaths.CHANGE_SETTINGS}`,
    {
      method: FetchMethods.PUT,
      data,
    }
  )
}

export async function changeAvatar(avatar: File): Promise<User> {
  const formData = new FormData()
  formData.append('avatar', avatar)
  return await request(
    BASE_YA_URL,
    `${USER_API_URL}${UserApiPaths.CHANGE_AVATAR}`,
    {
      method: FetchMethods.PUT,
      data: formData,
    }
  )
}

export async function changePassword(data: IUserPassword): Promise<void> {
  return await request(
    BASE_YA_URL,
    `${USER_API_URL}${UserApiPaths.CHANGE_PASSWORD}`,
    {
      method: FetchMethods.PUT,
      data,
    }
  )
}

export async function getUserById(id: number): Promise<User> {
  return await request(
    BASE_YA_URL,
    `${USER_API_URL}${UserApiPaths.GET_USER}${id}`,
    {
      method: FetchMethods.GET,
    }
  )
}

export async function getUserRole(
  userId: number
): Promise<{ role: UserRolesEnum }> {
  return await request(BASE_SERVER_URL, `${USERS_API_URL}/${userId}`, {
    method: FetchMethods.GET,
  })
}
