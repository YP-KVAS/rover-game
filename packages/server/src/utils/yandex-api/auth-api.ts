import fetch from 'cross-fetch'
import {
  AUTH_API_URL,
  AuthApiPaths,
  YA_API_URL,
} from '../const-variables/api-yandex'
import type { ApiError } from '../types/api'
import type { User } from '../types/user'

const checkResponse = (res: Response): Promise<User | ApiError> => {
  try {
    const data = res.json()
    if (res.ok) {
      return data
    }
    return data.then((err: any) => {
      return { status: res.status, reason: err?.reason }
    })
  } catch (err) {
    throw new Error()
  }
}

export const getUser = async (cookies?: string): Promise<User | ApiError> => {
  // TODO: fix cookies (not sent from client), fetch url
  console.log('cookies', cookies)
  try {
    const res = await fetch(
      `http://localhost:3001${YA_API_URL}${AUTH_API_URL}${AuthApiPaths.USER}`,
      {
        credentials: 'include',
        headers: {
          cookie: 'authCookie=abcd; uuid=12345',
        },
      }
    )
    return checkResponse(res)
  } catch (err) {
    throw new Error()
  }
}
