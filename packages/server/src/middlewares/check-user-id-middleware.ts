import type { NextFunction, Request, Response } from 'express'
import { INTERNAL_SERVER_ERROR } from '../utils/const-variables/api'
import { topicService } from '../services/TopicService'
import { commentService } from '../services/CommentService'

export const checkTopicAuth =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const topicId = parseInt(req.params['id'])
      const topic = await topicService.findById(topicId)
      if (topic?.userId === res.locals.user.id) {
        return next()
      }
      return res.status(403).json({ reason: 'Forbidden' })
    } catch (err) {
      return res.status(500).json({ reason: INTERNAL_SERVER_ERROR })
    }
  }

export const checkCommentAuth =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const commentId = parseInt(req.params['id'])
      const comment = await commentService.findById(commentId)
      if (comment?.userId === res.locals.user.id) {
        return next()
      }
      return res.status(403).json({ reason: 'Forbidden' })
    } catch (err) {
      return res.status(500).json({ reason: INTERNAL_SERVER_ERROR })
    }
  }
