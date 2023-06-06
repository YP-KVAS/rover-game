import type { IUserRepository } from '../repositories/UserRepository'
import { UserRepository } from '../repositories/UserRepository'
import type { Leaderboard, User } from '../utils/types/user'
import { getUserById } from '../utils/yandex-api/user-api'
import { Op } from 'sequelize'

export class LeaderboardService {
  constructor(private _userRepository: IUserRepository) {}

  async findAll(
    cookies?: string,
    limit?: number,
    offset?: number
  ): Promise<Leaderboard> {
    const users = await this._userRepository.getAll(
      limit,
      offset,
      [
        ['best_score', 'DESC'],
        ['updatedAt', 'DESC'],
      ],
      [['best_score', { [Op.ne]: null }]]
    )

    const leaderboardUsers = users.map(async user => {
      const yaUser = await getUserById(user.id, cookies)
      if (!yaUser) {
        throw new Error(`User with id ${user.id} was not found in ya-praktikum`)
      }
      const { display_name, avatar } = yaUser as User

      return {
        id: user.id,
        display_name,
        avatar,
        best_score: user.bestScore,
      }
    })

    const total = await this._userRepository.countPlayers()
    return { players: await Promise.all(leaderboardUsers), total }
  }
}

export const leaderboardService = new LeaderboardService(new UserRepository())
