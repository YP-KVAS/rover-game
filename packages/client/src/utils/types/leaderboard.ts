export interface LeaderboardRequest extends Record<string, unknown> {
  ratingFieldName: string
  cursor: number
  limit: number
}

export interface UserData extends Record<string, unknown> {
  id: number
  score: number
}

export interface LeaderboardItem extends Record<string, unknown> {
  data: UserData
}
