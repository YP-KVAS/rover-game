import { FetchMethods, request } from './base-request'
import {
  LEADERBOARD_API_URL,
  BASE_SERVER_URL,
  LEADERBOARD_LOAD_LIMIT,
} from '../const-variables/api'
import { Leaderboard } from '../types/leaderboard'
import { stringifyQuery } from '../stringify-query'
import { BaseGetAllItemsQuery } from '../types/base-query'
import { UserScore } from '../types/user'

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

export async function updateScore(score: number): Promise<UserScore> {
  return await request(BASE_SERVER_URL, `${LEADERBOARD_API_URL}`, {
    method: FetchMethods.PATCH,
    data: { score },
  })
}
