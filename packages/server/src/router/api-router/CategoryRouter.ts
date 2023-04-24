import BaseRouter from '../base/BaseRouter'
import { CategoryController } from '../../controllers/CategoryController'
import {
  createCategoryValidationSchema,
  deleteCategoryValidationSchema,
  updateCategoryValidationSchema,
} from '../../utils/validation-schemas'
import { RolesEnum } from '../../utils/types/api'
import { validateRequest } from '../../middlewares/validation-middleware'
import { checkAuth } from '../../middlewares/auth-middleware'

const categoryController = new CategoryController()

class CategoryRouter extends BaseRouter {
  constructor() {
    super()
  }

  routes(): void {
    this.router.post(
      '',
      [
        validateRequest(createCategoryValidationSchema),
        checkAuth([RolesEnum.ADMIN]),
      ],
      categoryController.create
    )
    this.router.put(
      '/:id',
      [
        validateRequest(updateCategoryValidationSchema),
        checkAuth([RolesEnum.ADMIN]),
      ],
      categoryController.update
    )
    this.router.delete(
      '/:id',
      [
        validateRequest(deleteCategoryValidationSchema),
        checkAuth([RolesEnum.ADMIN]),
      ],
      categoryController.delete
    )
    this.router.get('', checkAuth(), categoryController.findAll)
  }
}

export default new CategoryRouter().router
