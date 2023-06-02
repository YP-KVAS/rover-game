import { RootState } from '../store'

export const selectLeaderboardUsers = (state: RootState) =>
  state.leaderboard.leaderboardUsers

export const selectLeaderboardState = (state: RootState) => {
  return {
    isLoading: state.leaderboard.isLoading,
    errorMessage: state.leaderboard.errorMessage,
  }
}

export const selectLeaderboardUsersTotal = (state: RootState) =>
  state.leaderboard.total
