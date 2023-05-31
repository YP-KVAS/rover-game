import { RootState } from '../store'

export const selectLeaderboardItems = (state: RootState) => state.leaderboard.leaderboardItems
export const selectUserItems = (state: RootState) => state.leaderboard.userItems
