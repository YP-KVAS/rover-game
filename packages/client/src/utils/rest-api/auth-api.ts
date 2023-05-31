import { FetchMethods, request } from './base-request'
import {
  AUTH_API_URL,
  AuthApiPaths,
  BASE_SERVER_URL,
  BASE_YA_URL,
  USER_API_URL,
} from '../const-variables/api'
import { UserSignIn, UserSignUp } from '../types/user'
import { UserWithRole } from '../types/user'

export async function getUser(): Promise<UserWithRole> {
  // Почему тут изменился путь? Было: `${AUTH_API_URL}${AuthApiPaths.USER}` = /auth/user
  // Стало /user
  return await request(BASE_SERVER_URL, USER_API_URL, {
    method: FetchMethods.GET,
    noCached: true,
  })
}

export async function signIn(data: UserSignIn): Promise<void> {
  return await request(BASE_YA_URL, `${AUTH_API_URL}${AuthApiPaths.SIGN_IN}`, {
    method: FetchMethods.POST,
    data,
  })
}

export async function signUp(data: UserSignUp): Promise<{ id: number }> {
  return await request(BASE_YA_URL, `${AUTH_API_URL}${AuthApiPaths.SIGN_UP}`, {
    method: FetchMethods.POST,
    data,
  })
}

export async function logout(): Promise<void> {
  return await request(BASE_YA_URL, `${AUTH_API_URL}${AuthApiPaths.LOGOUT}`, {
    method: FetchMethods.POST,
  })
}
