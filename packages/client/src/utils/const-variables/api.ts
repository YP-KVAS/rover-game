// TODO: make url configurable (local, dev, prod)
const BASE_URL = 'http://localhost:3001'
export const BASE_YA_URL = `${BASE_URL}/ya-api`
export const BASE_SERVER_URL = `${BASE_URL}/api/v1`

export const AUTH_API_URL = '/auth'
export const USER_API_URL = '/user'
export const RESOURCES_API_URL = '/resources'
export const LEADERBOARD_API_URL = '/leaderboard'
export const TEAM_NAME = 'kvas'

export enum AuthApiPaths {
  SIGN_UP = '/signup',
  SIGN_IN = '/signin',
  USER = '/user',
  LOGOUT = '/logout',
}

export enum UserApiPaths {
  CHANGE_SETTINGS = '/profile',
  CHANGE_AVATAR = '/profile/avatar',
  CHANGE_PASSWORD = '/password',
}

export enum LeaderboardApiPaths {
  GET_ALL_LEADERBOARDS = '/all',
}
