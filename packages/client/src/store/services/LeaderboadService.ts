import { Leaderboard } from '../../utils/types/leaderboard'
import { ILeaderboardRepository } from '../repositories/LeaderboardRepository'
import { BaseGetAllItemsQuery } from '../../utils/types/base-query'

export interface ILeaderboardService {
  getLeaderboard(query: BaseGetAllItemsQuery): Promise<Leaderboard>
}

export class LeaderboardService implements ILeaderboardService {
  constructor(private _repo: ILeaderboardRepository) {}

  async getLeaderboard(query: BaseGetAllItemsQuery) {
    return this._repo.getLeaderboard(query)
  }
}
