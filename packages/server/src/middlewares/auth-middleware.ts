import { ApiError, instanceOfApiError, RolesEnum } from '../utils/types/api'
import type { NextFunction, Request, Response } from 'express'
import { getUser } from '../utils/yandex-api/user-api'
import type { User } from '../utils/types/user'
import { INTERNAL_SERVER_ERROR } from '../utils/const-variables/api'
import { userService } from '../services/UserService'

export const checkAuth =
  (roles?: Array<RolesEnum>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // check auth cookies
      const userOrErr = await getUser(req.headers.cookie)
      if (instanceOfApiError(userOrErr)) {
        const { status, reason } = userOrErr as ApiError
        return res.status(status).json({ reason })
      }

      res.locals.user = userOrErr

      // check role
      if (roles) {
        const role = await userService.findUserRole((userOrErr as User).id)
        if (!role || !Object.values(roles).includes(role)) {
          return res.status(403).json({ reason: 'Forbidden' })
        }

        res.locals.role = role
      }

      // next
      return next()
    } catch (err) {
      return res.status(500).json({ reason: INTERNAL_SERVER_ERROR })
    }
  }
