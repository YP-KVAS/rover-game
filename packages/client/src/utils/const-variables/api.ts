export const BASE_URL = 'https://ya-praktikum.tech/api/v2'

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
  GET_USER = '/',
  CHANGE_SETTINGS = '/profile',
  CHANGE_AVATAR = '/profile/avatar',
  CHANGE_PASSWORD = '/password',
}

export enum LeaderboardApiPaths {
  GET_ALL_LEADERBOARDS = '/all',
}
