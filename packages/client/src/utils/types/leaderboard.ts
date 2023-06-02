import { LeaderboardUser } from './user'

export interface Leaderboard {
  players: LeaderboardUser[]
  total: number
}

export interface UserData extends Record<string, unknown> {
  id: number
  login: string
  avatar: string | null
  score: number
}

export interface addUserToLeaderboardRequest extends Record<string, unknown> {
  data: UserData
  ratingFieldName: string
  teamName: string
}
