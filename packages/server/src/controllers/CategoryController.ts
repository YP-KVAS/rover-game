import type { Request, Response } from 'express'
import { INTERNAL_SERVER_ERROR } from '../utils/const-variables/api'
import { categoryService } from '../services/CategoryService'

export class CategoryController {
  async findAll(_: Request, res: Response) {
    try {
      const categories = await categoryService.findAll()
      return res.status(200).json(categories)
    } catch (err) {
      return res.status(500).json({
        reason: INTERNAL_SERVER_ERROR,
      })
    }
  }

  async create(req: Request, res: Response) {
    try {
      const category = await categoryService.create(req.body.name)
      return res.status(201).json(category)
    } catch (err) {
      return res.status(500).json({
        reason: INTERNAL_SERVER_ERROR,
      })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params['id'])
      const category = await categoryService.update(id, req.body.name)

      return res.status(200).json(category)
    } catch (err) {
      return res.status(500).json({
        reason: INTERNAL_SERVER_ERROR,
      })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params['id'])
      await categoryService.delete(id)

      return res.status(200).json('OK')
    } catch (err) {
      return res.status(500).json({
        reason: INTERNAL_SERVER_ERROR,
      })
    }
  }
}
