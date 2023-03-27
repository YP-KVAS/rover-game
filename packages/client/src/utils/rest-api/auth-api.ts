import { FetchMethods, request } from './base-request'
import { AUTH_API_URL, AuthApiPaths } from '../const-variables/api'
import { User, UserSignIn, UserSignUp } from '../types/user'

export async function getUser(): Promise<User> {
  return await request<User>(`${AUTH_API_URL}${AuthApiPaths.USER}`, {
    method: FetchMethods.GET,
  })
}

export async function signIn(data: UserSignIn): Promise<void> {
  return await request(`${AUTH_API_URL}${AuthApiPaths.SIGN_IN}`, {
    method: FetchMethods.POST,
    data,
  })
}

export async function signUp(data: UserSignUp): Promise<{ id: number }> {
  return await request(`${AUTH_API_URL}${AuthApiPaths.SIGN_UP}`, {
    method: FetchMethods.POST,
    data,
  })
}

export async function logout(): Promise<void> {
  return await request(`${AUTH_API_URL}${AuthApiPaths.LOGOUT}`, {
    method: FetchMethods.POST,
  })
}

