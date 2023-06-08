import * as process from 'process'

// const BASE_URL = process.env?.VITE_BASE_URL || 'http://localhost:3000'
const BASE_URL = 'http://158.160.3.219:5000'
export const BASE_YA_URL = `${BASE_URL}/ya-api`
export const BASE_SERVER_URL = `${BASE_URL}/api/v1`

export const OAUTH_REDIRECT_URI = BASE_URL
export const YA_OAUTH_URL =
  'https://oauth.yandex.ru/authorize?response_type=code'
export const OAUTH_API_URL = '/oauth/yandex'
export const OAUTH_SERVICE_ID = '/service-id'

export const AUTH_API_URL = '/auth'
export const USER_API_URL = '/user'
export const RESOURCES_API_URL = '/resources'
export const LEADERBOARD_API_URL = '/leaderboard'

export const FORUM_CATEGORIES_API_URL = '/categories'
export const FORUM_TOPICS_API_URL = '/topics'
export const FORUM_COMMENTS_API_URL = '/comments'

export const TOPICS_LOAD_LIMIT = 15
export const COMMENTS_LOAD_LIMIT = 8
export const LEADERBOARD_LOAD_LIMIT = 8

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
