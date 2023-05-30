import type { Request, Response } from 'express'
import { INTERNAL_SERVER_ERROR } from '../utils/const-variables/api'
import { userService } from '../services/UserService'

export class UserController {
  async findUser(req: Request, res: Response) {
    try {
      const user = await userService.findUserWithRole(
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
}
