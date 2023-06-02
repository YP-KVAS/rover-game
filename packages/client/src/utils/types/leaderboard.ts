import { LeaderboardUser } from './user'

export interface Leaderboard {
  players: LeaderboardUser[]
  total: number
}
