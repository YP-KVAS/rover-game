import BaseRouter from '../base/BaseRouter'
import { validateRequest } from '../../middlewares/validation-middleware'
import {
  addCommentValidationSchema,
  deleteTopicValidationSchema,
  getCommentsValidationSchema,
  updateTopicValidationSchema,
} from '../../utils/validation-schemas'
import { checkAuth } from '../../middlewares/auth-middleware'
import { TopicController } from '../../controllers/TopicController'
import { checkTopicAuth } from '../../middlewares/check-user-id-middleware'
import { COMMENTS_URL } from '../../utils/const-variables/api'
import { CommentController } from '../../controllers/CommentController'

const topicController = new TopicController()
const commentController = new CommentController()

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

    this.router.get(
      `/:id${COMMENTS_URL}`,
      [validateRequest(getCommentsValidationSchema), checkAuth()],
      commentController.findAll
    )

    this.router.post(
      `/:id${COMMENTS_URL}`,
      [validateRequest(addCommentValidationSchema), checkAuth()],
      commentController.create
    )
  }
}

export default new TopicRouter().router
