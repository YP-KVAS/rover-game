import { TopicModel } from '../models/TopicModel'
import type { Transaction } from 'sequelize'
import { sequelize } from '../../db'
import { Op } from 'sequelize'

export interface ITopicRepository {
  save(
    name: string,
    userId: number,
    categoryId: number,
    transaction?: Transaction
  ): Promise<TopicModel>
  getAll(
    categoryId: number,
    limit?: number,
    updatedAt?: number,
    search?: string
  ): Promise<TopicModel[]>
  getById(topicId: number): Promise<TopicModel | null>
  update(topic: TopicModel): Promise<TopicModel>
  delete(topicId: number): Promise<void>
}

export class TopicRepository implements ITopicRepository {
  async save(
    name: string,
    userId: number,
    categoryId: number,
    transaction?: Transaction
  ): Promise<TopicModel> {
    try {
      return await TopicModel.create(
        { name, userId, categoryId },
        { transaction }
      )
    } catch (err) {
      throw new Error('CREATE: Failed to create a new topic')
    }
  }

  async getAll(
    categoryId: number,
    limit?: number,
    updatedAt?: number,
    search?: string
  ): Promise<TopicModel[]> {
    try {
      const whereCondition: Record<string, unknown> = { categoryId }
      if (updatedAt) {
        whereCondition.updatedAt = { [Op.lt]: updatedAt }
      }
      if (search) {
        whereCondition.name = sequelize.where(
          sequelize.fn('LOWER', sequelize.col('name')),
          'LIKE',
          `%${search.toLowerCase()}%`
        )
      }
      return await TopicModel.findAll({
        where: whereCondition,
        order: [['updatedAt', 'DESC']],
        limit,
      })
    } catch (err) {
      throw new Error(
        `GET: Failed to get all topics for category with id ${categoryId}`
      )
    }
  }

  async getById(topicId: number): Promise<TopicModel | null> {
    try {
      return await TopicModel.findOne({
        where: {
          id: topicId,
        },
      })
    } catch (err) {
      throw new Error(`GET: Failed to get topic by id ${topicId}`)
    }
  }

  async update(topic: TopicModel): Promise<TopicModel> {
    try {
      const topicToUpdate = await TopicModel.findOne({
        where: { id: topic.id },
      })

      if (!topicToUpdate) {
        throw new Error(`UPDATE: Topic with id ${topic.id} was not found`)
      }

      topic.name ||= topicToUpdate.name
      topic.categoryId ||= topicToUpdate.categoryId

      topicToUpdate.name = topic.name
      topicToUpdate.categoryId = topic.categoryId

      return await topicToUpdate.save()
    } catch (err) {
      throw new Error(`PATCH: Failed to update topic with id ${topic.id}`)
    }
  }

  async delete(topicId: number): Promise<void> {
    try {
      const topicToDelete = await TopicModel.findOne({
        where: {
          id: topicId,
        },
      })

      if (!topicToDelete) {
        throw new Error(`DELETE: Topic with id ${topicId} was not found`)
      }

      await topicToDelete.destroy()
    } catch (err) {
      throw new Error(`DELETE: Failed to delete topic with id ${topicId}`)
    }
  }
}
