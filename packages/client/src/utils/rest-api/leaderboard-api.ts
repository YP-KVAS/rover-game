import { FetchMethods, request } from './base-request'
import {
  LEADERBOARD_API_URL,
  TEAM_NAME,
  LeaderboardApiPaths,
} from '../const-variables/api'
import {
  LeaderboardItem,
  LeaderboardRequest,
  addUserToLeaderboardRequest,
} from '../types/leaderboard'

export async function getAllLeaderboards(
  data: LeaderboardRequest
): Promise<Array<LeaderboardItem>> {
  return await request<Array<LeaderboardItem>>(
    `${LEADERBOARD_API_URL}${LeaderboardApiPaths.GET_ALL_LEADERBOARDS}`,
    {
      method: FetchMethods.POST,
      data,
    }
  )
}

export async function getLeaderboardByTeamName(
  data: LeaderboardRequest,
  teamName: string = TEAM_NAME
): Promise<Array<LeaderboardItem>> {
  return await request<Array<LeaderboardItem>>(
    `${LEADERBOARD_API_URL}/${teamName}`,
    {
      method: FetchMethods.POST,
      data,
    }
  )
}

export async function addUserToLeaderboard(
  data: addUserToLeaderboardRequest
): Promise<void> {
  return await request(`${LEADERBOARD_API_URL}`, {
    method: FetchMethods.POST,
    data,
  })
}
