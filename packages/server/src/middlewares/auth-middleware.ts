import { ApiError, instanceOfApiError, RolesEnum } from '../utils/types/api'
import type { NextFunction, Request, Response } from 'express'
import { getUser } from '../utils/yandex-api/auth-api'
import { UserRepository } from '../repositories/UserRepository'
import type { User } from '../utils/types/user'
import { INTERNAL_SERVER_ERROR } from '../utils/const-variables/api'

export const checkAuth =
  (roles?: Array<RolesEnum>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // check auth cookies
      // TODO: fix undefined cookies
      const userOrErr = await getUser(req.headers.cookie)
      if (instanceOfApiError(userOrErr)) {
        const { status, reason } = userOrErr as ApiError
        return res.status(status).json({ reason })
      }

      // check role
      if (roles) {
        const user = await new UserRepository().getById((userOrErr as User).id)
        if (
          !user?.role?.name ||
          !Object.values(roles).includes(user.role.name)
        ) {
          return res.status(403).json({ reason: 'Forbidden' })
        }
      }

      // next
      return next()
    } catch (err) {
      return res.status(500).json({ reason: INTERNAL_SERVER_ERROR })
    }
  }
