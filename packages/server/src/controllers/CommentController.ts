import type { Request, Response } from 'express'
import { INTERNAL_SERVER_ERROR } from '../utils/const-variables/api'
import { getQueryLimitAndOffset } from '../utils/util-functions'
import { commentService } from '../services/CommentService'

export class CommentController {
  async findAll(req: Request, res: Response) {
    try {
      const topicId = parseInt(req.params['id'])
      const { limit, offset } = getQueryLimitAndOffset(req)

      const parentCommentId =
        typeof req.query['parentCommentId'] === 'string' &&
        req.query['parentCommentId'].length > 0
          ? parseInt(req.query['parentCommentId'])
          : null

      const comments = await commentService.findAll(
        topicId,
        parentCommentId,
        req.headers.cookie,
        limit,
        offset
      )
      return res.status(200).json(comments)
    } catch (err) {
      return res.status(500).json({
        reason: INTERNAL_SERVER_ERROR,
      })
    }
  }

  async create(req: Request, res: Response) {
    try {
      const topicId = parseInt(req.params['id'])
      const { message, userId, parentCommentId } = req.body
      const comment = await commentService.create(
        message,
        userId,
        topicId,
        parentCommentId
      )
      return res.status(201).json(comment)
    } catch (err) {
      return res.status(500).json({
        reason: INTERNAL_SERVER_ERROR,
      })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params['id'])
      const comment = await commentService.update(id, req.body.message)

      return res.status(200).json(comment)
    } catch (err) {
      return res.status(500).json({
        reason: INTERNAL_SERVER_ERROR,
      })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params['id'])
      await commentService.delete(id)

      return res.status(200).json('OK')
    } catch (err) {
      return res.status(500).json({
        reason: INTERNAL_SERVER_ERROR,
      })
    }
  }
}
