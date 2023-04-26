import type { Request, Response } from 'express'
import { TopicService } from '../services/TopicService'
import { INTERNAL_SERVER_ERROR } from '../utils/const-variables/api'

const topicService = new TopicService()

export class TopicController {
  async findAll(req: Request, res: Response) {
    try {
      const categoryId = parseInt(req.params['id'])
      const limit =
        typeof req.query['limit'] === 'string'
          ? parseInt(req.query['limit'])
          : undefined
      const offset =
        typeof req.query['offset'] === 'string'
          ? parseInt(req.query['offset'])
          : undefined
      const search =
        typeof req.query['search'] === 'string' ? req.query['search'] : ''

      const topics = await topicService.findAll(
        categoryId,
        limit,
        offset,
        search
      )
      return res.status(200).json(topics)
    } catch (err) {
      return res.status(500).json({
        reason: INTERNAL_SERVER_ERROR,
      })
    }
  }

  async create(req: Request, res: Response) {
    try {
      const categoryId = parseInt(req.params['id'])
      const { name, userId, message } = req.body
      const topic = await topicService.create(name, userId, categoryId, message)
      return res.status(201).json(topic)
    } catch (err) {
      return res.status(500).json({
        reason: INTERNAL_SERVER_ERROR,
      })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params['id'])
      const topic = await topicService.update(
        id,
        req.body.name,
        req.body.categoryId
      )

      return res.status(200).json(topic)
    } catch (err) {
      return res.status(500).json({
        reason: INTERNAL_SERVER_ERROR,
      })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params['id'])
      await topicService.delete(id)

      return res.status(200).json('OK')
    } catch (err) {
      return res.status(500).json({
        reason: INTERNAL_SERVER_ERROR,
      })
    }
  }
}
