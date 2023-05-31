export interface UserItem {
  id: number
  roleId: number
  score: number
}

export interface LeaderboardRequest extends Record<string, unknown> {
  ratingFieldName: string
  cursor: number
  limit: number
}

export interface UserData extends Record<string, unknown> {
  id: number
  login: string
  avatar: string | null
  score: number
}

export interface LeaderboardItem extends Record<string, unknown> {
  data: UserData
}

export interface addUserToLeaderboardRequest extends Record<string, unknown> {
  data: UserData
  ratingFieldName: string
  teamName: string
}
