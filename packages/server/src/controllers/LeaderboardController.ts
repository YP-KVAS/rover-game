import type { Request, Response } from 'express'
import { leaderboardService } from '../services/LeaderboardService'
import { INTERNAL_SERVER_ERROR } from '../utils/const-variables/api'
import { getQueryLimitAndOffset } from '../utils/util-functions'
import { userService } from '../services/UserService'

export class LeaderboardController {
  async findAll(req: Request, res: Response) {
    try {
      const { limit, offset } = getQueryLimitAndOffset(req)

      const leaderboardData = await leaderboardService.findAll(
        req.headers.cookie,
        limit,
        offset
      )
      return res.status(200).json(leaderboardData)
    } catch (err) {
      return res.status(500).json({
        reason: INTERNAL_SERVER_ERROR,
      })
    }
  }

  async updateScore(req: Request, res: Response) {
    try {
      const id = res.locals.user.id
      const userScore = await userService.updateScore(id, req.body.score)
      return res.status(200).json(userScore)
    } catch (err) {
      return res.status(500).json({
        reason: INTERNAL_SERVER_ERROR,
      })
    }
  }
}
