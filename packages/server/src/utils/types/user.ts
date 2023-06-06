import type { RolesEnum } from './api'

export interface User {
  id: number
  login: string
  first_name: string
  second_name: string
  email: string
  phone: string
  display_name: string | null
  avatar: string | null
}

export interface RoverUser {
  id: number
  role: RolesEnum
  best_score: number | null
}

export interface UserExtended extends User, RoverUser {}

export interface UserScore {
  id: number
  best_score: number | null
}

export interface LeaderboardUser extends UserScore {
  display_name: string | null
  avatar: string | null
}

export interface Leaderboard {
  players: LeaderboardUser[]
  total: number
}
