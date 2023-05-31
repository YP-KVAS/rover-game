import type { Request, Response } from 'express'
import { INTERNAL_SERVER_ERROR } from '../utils/const-variables/api'
import { userService } from '../services/UserService'

export class UserController {
  async findUserById(req: Request, res: Response) {
    try {
      const user = await userService.findUserWithRoleAndScore(
        req.headers.cookie,
        res.locals.user,
        res.locals.role
      )

      return res.status(200).json(user)
    } catch (err) {
      return res.status(500).json({
        reason: INTERNAL_SERVER_ERROR,
      })
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params['id'])
      const user = await userService.update(id, req.body.role, req.body.score)

      return res.status(200).json(user)
    } catch (err) {
      return res.status(500).json({
        reason: INTERNAL_SERVER_ERROR,
      })
    }
  }

  async findAll(_: Request, res: Response) {
    try {
      const users = await userService.findAll()

      return res.status(200).json(users)
    } catch (err) {
      return res.status(500).json({
        reason: INTERNAL_SERVER_ERROR,
      })
    }
  }
}
