import { RootState } from '../store'

export const selectLeaderboardItems = (state: RootState) =>
  state.leaderboard.leaderboardItems

export const selectLeaderboardItemsLength = (state: RootState) =>
  state.leaderboard.leaderboardItems?.length || 0

export const selectLeaderboardIsLoading = (state: RootState) =>
  state.leaderboard.isLoading
