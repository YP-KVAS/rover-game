export enum RoutesEnum {
  MAIN = '/',
  REGISTRATION = '/registration',
  LOGIN = '/login',
  USER_SETTINGS = '/user_settings',
  FORUM = '/forum',
  FORUM_CATEGORY = '/forum/:categoryId',
  FORUM_TOPIC = '/forum/:categoryId/:topicId',
  GAME = '/game',
  LEADERBOARD = '/leaderboard',
  ERROR_500 = '/500',
  START = '/start',
}

export const PAGE_QUERY = 'page'
