import { FetchMethods, request } from './base-request'
import { LEADERBOARD_API_URL, LeaderboardApiPaths } from '../const-variables/api'
import { LeaderboardRequest, LeaderboardItem } from '../types/leaderboard'

export async function getAllLeaderboards(data: LeaderboardRequest): Promise<Array<LeaderboardItem>> {
  return await request<User>(`${LEADERBOARD_API_URL}${LeaderboardApiPaths.GET_ALL_LEADERBOARDS}`, {
    method: FetchMethods.POST,
    data
  })
}
