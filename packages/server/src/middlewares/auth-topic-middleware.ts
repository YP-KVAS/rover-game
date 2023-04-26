import type { NextFunction, Request, Response } from 'express'
import { INTERNAL_SERVER_ERROR } from '../utils/const-variables/api'
import { TopicService } from '../services/TopicService'

export const checkTopicAuth =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const topicId = parseInt(req.params['id'])
      const topic = await new TopicService().findById(topicId)
      if (topic?.userId === res.locals.user.id) {
        return next()
      }
      return res.status(403).json({ reason: 'Forbidden' })
    } catch (err) {
      return res.status(500).json({ reason: INTERNAL_SERVER_ERROR })
    }
  }
