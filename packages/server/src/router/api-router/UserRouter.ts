import BaseRouter from '../base/BaseRouter'
import { getUserValidationSchema } from '../../utils/validation-schemas'
import { UserController } from '../../controllers/UserController'
import { validateRequest } from '../../middlewares/validation-middleware'
import { checkAuth } from '../../middlewares/auth-middleware'

const userController = new UserController()

class UserRouter extends BaseRouter {
  constructor() {
    super()
  }

  routes(): void {
    this.router.get(
      '/:id',
      [validateRequest(getUserValidationSchema), checkAuth()],
      userController.findRoleById
    )
  }
}

export default new UserRouter().router
