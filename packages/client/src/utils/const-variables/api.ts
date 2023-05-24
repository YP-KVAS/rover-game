export const BASE_URL = 'https://ya-praktikum.tech/api/v2'

export const BASE_YA_API_URL = 'https://ya-praktikum.tech/api/v2'
// export const OAUTH_REDIRECT_URI = 'https://rover-game-client.vercel.app'
export const OAUTH_REDIRECT_URI = 'http://localhost:3000' //5000
// export const OAUTH_REDIRECT_URL = BASE_URL
export const YA_OAUTH_URL = 'https://oauth.yandex.ru/authorize?response_type=code'
export const OAUTH_API_URL = '/oauth/yandex'
export const OAUTH_SERVICE_ID = '/service-id'

export const AUTH_API_URL = '/auth'
export const USER_API_URL = '/user'
export const RESOURCES_API_URL = '/resources'
export const LEADERBOARD_API_URL = '/leaderboard'
export const TEAM_NAME = 'kvas'

export enum AuthApiPaths {
  SIGN_UP = '/signup',
  SIGN_IN = '/signin',
  USER = '/user',
  LOGOUT = '/logout'
}

export enum UserApiPaths {
  CHANGE_SETTINGS = '/profile',
  CHANGE_AVATAR = '/profile/avatar',
  CHANGE_PASSWORD = '/password',
}

export enum LeaderboardApiPaths {
  GET_ALL_LEADERBOARDS = '/all'
}
