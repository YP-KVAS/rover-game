import { FetchMethods, request } from './base-request'
import {
  LEADERBOARD_API_URL,
  LeaderboardApiPaths,
  BASE_YA_URL,
} from '../const-variables/api'
import {
  LeaderboardItem,
  LeaderboardRequest,
  addUserToLeaderboardRequest,
} from '../types/leaderboard'

export async function getAllLeaderboards(
  data: LeaderboardRequest
): Promise<LeaderboardItem[]> {
  return await request<LeaderboardItem[]>(
    BASE_YA_URL,
    `${LEADERBOARD_API_URL}${LeaderboardApiPaths.GET_ALL_LEADERBOARDS}`,
    {
      method: FetchMethods.POST,
      data,
    }
  )
}

export async function addUserToLeaderboard(
  data: addUserToLeaderboardRequest
): Promise<void> {
  return await request(BASE_YA_URL, `${LEADERBOARD_API_URL}`, {
    method: FetchMethods.POST,
    data,
  })
}
