import type { Request, Response } from 'express'
import { INTERNAL_SERVER_ERROR } from '../utils/const-variables/api'
import { userService } from '../services/UserService'

export class UserController {
  async findRoleById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params['id'])
      const role = await userService.findRoleById(id)

      return res.status(200).json({ role })
    } catch (err) {
      return res.status(500).json({
        reason: INTERNAL_SERVER_ERROR,
      })
    }
  }
}
