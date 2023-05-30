import BaseRouter from '../base/BaseRouter'
import { UserController } from '../../controllers/UserController'
import { checkAuth } from '../../middlewares/auth-middleware'

const userController = new UserController()

class UserRouter extends BaseRouter {
  constructor() {
    super()
  }

  routes(): void {
    this.router.get('', [checkAuth()], userController.findUser)
  }
}

export default new UserRouter().router
