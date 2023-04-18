export enum EnumPages {
  MAIN = 'Main',
  REGISTRATION = 'Registration',
  LOGIN = 'Login',
  USER_SETTINGS = 'UserSettings',
  FORUM = 'Forum',
  START_PAGE = 'Start',
  GAME_PAGE = 'GamePage',
  LEADERBOARD = 'Leaderboard',
  ERROR_500 = 'Page500',
  ERROR_404 = 'Page404',
}

export const protectedPages = [
  EnumPages.START_PAGE,
  EnumPages.GAME_PAGE,
  EnumPages.USER_SETTINGS,
  EnumPages.LEADERBOARD,
  EnumPages.FORUM,
]
