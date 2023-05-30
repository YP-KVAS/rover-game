import BaseRouter from '../base/BaseRouter'
import { validateRequest } from '../../middlewares/validation-middleware'
import {
  deleteCommentValidationSchema,
  updateCommentValidationSchema,
} from '../../utils/validation-schemas'
import { checkAuth } from '../../middlewares/auth-middleware'
import { checkCommentAuth } from '../../middlewares/check-user-id-middleware'
import { CommentController } from '../../controllers/CommentController'

const commentController = new CommentController()

class TopicRouter extends BaseRouter {
  constructor() {
    super()
  }

  routes(): void {
    this.router.patch(
      `/:id`,
      [
        validateRequest(updateCommentValidationSchema),
        checkAuth(),
        checkCommentAuth(),
      ],
      commentController.update
    )

    this.router.delete(
      `/:id`,
      [
        validateRequest(deleteCommentValidationSchema),
        checkAuth(),
        checkCommentAuth(),
      ],
      commentController.delete
    )
  }
}

export default new TopicRouter().router
