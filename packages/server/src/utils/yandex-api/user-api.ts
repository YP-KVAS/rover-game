import fetch from 'cross-fetch'
import {
  AUTH_API_URL,
  AuthApiPaths,
  USER_API_URL,
  YA_API_URL,
} from '../const-variables/api-yandex'
import type { ApiError } from '../types/api'
import type { User } from '../types/user'

const checkResponse = (res: Response): Promise<User | ApiError> => {
  const data = res.json()
  if (res.ok) {
    return data
  }
  return data.then((err: any) => {
    return { status: res.status, reason: err?.reason }
  })
}

export const getUser = async (cookies?: string): Promise<User | ApiError> => {
  const res = await fetch(
    `${process.env.BASE_URL}${YA_API_URL}${AUTH_API_URL}${AuthApiPaths.USER}`,
    {
      credentials: 'include',
      headers: {
        cookie: cookies || '',
      },
    }
  )
  return checkResponse(res)
}

export const getUserById = async (
  id: number,
  cookies?: string
): Promise<User | ApiError> => {
  const res = await fetch(
    `${process.env.BASE_URL}${YA_API_URL}${USER_API_URL}/${id}`,
    {
      credentials: 'include',
      headers: {
        cookie: cookies || '',
      },
    }
  )

  return checkResponse(res)
}
