import type { Leaderboard } from '../utils/types/user'
import { leaderboardService } from '../services/LeaderboardService'
import type { QueryClause } from '../utils/types/query'
import { instanceOfApiError } from '../utils/types/api'
import { ThunkUserRepository } from './ThunkUserRepository'

interface IThunkLeaderboardRepository {
  getLeaderboard(query: QueryClause): Promise<Leaderboard>
}

export class ThunkLeaderboardRepository implements IThunkLeaderboardRepository {
  thunkUserRepository

  constructor(private _cookie?: string) {
    this.thunkUserRepository = new ThunkUserRepository(this._cookie)
  }

  async getLeaderboard(query: QueryClause) {
    const userOrErr = await this.thunkUserRepository.getCurrentUser()

    if (!instanceOfApiError(userOrErr)) {
      return await leaderboardService.findAll(
        this._cookie,
        query.limit,
        query.offset
      )
    }
    return { players: [], total: 0 }
  }
}
