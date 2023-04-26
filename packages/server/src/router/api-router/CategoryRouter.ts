import BaseRouter from '../base/BaseRouter'
import { CategoryController } from '../../controllers/CategoryController'
import { TopicController } from '../../controllers/TopicController'
import {
  addTopicValidationSchema,
  createCategoryValidationSchema,
  deleteCategoryValidationSchema,
  getTopicsValidationSchema,
  updateCategoryValidationSchema,
} from '../../utils/validation-schemas'
import { RolesEnum } from '../../utils/types/api'
import { validateRequest } from '../../middlewares/validation-middleware'
import { checkAuth } from '../../middlewares/auth-middleware'
import { TOPICS_URL } from '../../utils/const-variables/api'

const categoryController = new CategoryController()
const topicController = new TopicController()

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

    this.router.get(
      `/:id${TOPICS_URL}`,
      [validateRequest(getTopicsValidationSchema), checkAuth()],
      topicController.findAll
    )

    this.router.post(
      `/:id${TOPICS_URL}`,
      [validateRequest(addTopicValidationSchema), checkAuth()],
      topicController.create
    )
  }
}

export default new CategoryRouter().router
