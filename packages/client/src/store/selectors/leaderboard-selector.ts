import { RootState } from '../store'

export const selectLeaderboardItems = (state: RootState) =>
  state.leaderboard.leaderboardItems
