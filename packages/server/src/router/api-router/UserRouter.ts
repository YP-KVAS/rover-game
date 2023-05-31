import BaseRouter from '../base/BaseRouter'
import { UserController } from '../../controllers/UserController'
import { checkAuth } from '../../middlewares/auth-middleware'

const userController = new UserController()

class UserRouter extends BaseRouter {
  constructor() {
    super()
  }

  routes(): void {
    this.router.get(
      '',
      [
        checkAuth()
      ],
      userController.findUserById
    )

    this.router.get(
      '/all',
      [
        checkAuth()
      ],
      userController.findAll
    )

    this.router.patch(
      `/:id`,
      [
        checkAuth(),
      ],
      userController.updateUser
    )
  }
}

export default new UserRouter().router
