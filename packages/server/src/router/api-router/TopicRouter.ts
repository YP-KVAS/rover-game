import BaseRouter from '../base/BaseRouter'
import { validateRequest } from '../../middlewares/validation-middleware'
import {
  deleteTopicValidationSchema,
  updateTopicValidationSchema,
} from '../../utils/validation-schemas'
import { checkAuth } from '../../middlewares/auth-middleware'
import { TopicController } from '../../controllers/TopicController'
import { checkTopicAuth } from '../../middlewares/auth-topic-middleware'

const topicController = new TopicController()

class TopicRouter extends BaseRouter {
  constructor() {
    super()
  }

  routes(): void {
    this.router.patch(
      `/:id`,
      [
        validateRequest(updateTopicValidationSchema),
        checkAuth(),
        checkTopicAuth(),
      ],
      topicController.update
    )

    this.router.delete(
      `/:id`,
      [
        validateRequest(deleteTopicValidationSchema),
        checkAuth(),
        checkTopicAuth(),
      ],
      topicController.delete
    )
  }
}

export default new TopicRouter().router
