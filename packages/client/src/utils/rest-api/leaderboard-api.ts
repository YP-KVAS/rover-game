import { FetchMethods, request } from './base-request'
import {
  LEADERBOARD_API_URL,
  BASE_YA_URL,
  BASE_SERVER_URL,
  LEADERBOARD_LOAD_LIMIT,
} from '../const-variables/api'
import { addUserToLeaderboardRequest, Leaderboard } from '../types/leaderboard'
import { stringifyQuery } from '../stringify-query'
import { BaseGetAllItemsQuery } from '../types/base-query'

export async function getLeaderboard(
  query: BaseGetAllItemsQuery
): Promise<Leaderboard> {
  const { limit = LEADERBOARD_LOAD_LIMIT, offset = 0 } = query

  return await request(
    BASE_SERVER_URL,
    `${LEADERBOARD_API_URL}${stringifyQuery({
      limit,
      offset,
    })}`,
    {
      method: FetchMethods.GET,
      noCached: true,
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
