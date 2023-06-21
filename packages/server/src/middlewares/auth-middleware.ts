import { ApiError, instanceOfApiError, RolesEnum } from '../utils/types/api'
import type { NextFunction, Request, Response } from 'express'
import { getUser } from '../utils/yandex-api/user-api'
import type { User } from '../utils/types/user'
import { INTERNAL_SERVER_ERROR } from '../utils/const-variables/api'
import { userService } from '../services/UserService'

export const checkAuth =
  (roles?: RolesEnum[]) =>
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
        const user = await userService.findRoverUser((userOrErr as User).id)
        if (!user || !Object.values(roles).includes(user.role.name)) {
          return res.status(403).json({ reason: 'Forbidden' })
        }

        res.locals.roverUser = user
      }

      // next
      return next()
    } catch (err) {
      return res.status(500).json({ reason: INTERNAL_SERVER_ERROR })
    }
  }
