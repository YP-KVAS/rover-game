import BaseRouter from '../base/BaseRouter'
import { LeaderboardController } from '../../controllers/LeaderboardController'
import { checkAuth } from '../../middlewares/auth-middleware'
import { validateRequest } from '../../middlewares/validation-middleware'
import { getLeaderboardUsersValidationSchema } from '../../utils/validation-schemas'

const leaderboardController = new LeaderboardController()

class LeaderboardRouter extends BaseRouter {
  constructor() {
    super()
  }

  routes(): void {
    this.router.get(
      '',
      [validateRequest(getLeaderboardUsersValidationSchema), checkAuth()],
      leaderboardController.findAll
    )
  }
}

export default new LeaderboardRouter().router
