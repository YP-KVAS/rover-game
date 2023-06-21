import { Leaderboard } from '../../utils/types/leaderboard'
import { getLeaderboard } from '../../utils/rest-api/leaderboard-api'
import { BaseGetAllItemsQuery } from '../../utils/types/base-query'

export interface ILeaderboardRepository {
  getLeaderboard(query: BaseGetAllItemsQuery): Promise<Leaderboard>
}

export class LeaderboardRepository implements ILeaderboardRepository {
  async getLeaderboard(query: BaseGetAllItemsQuery): Promise<Leaderboard> {
    return await getLeaderboard(query)
  }
}
