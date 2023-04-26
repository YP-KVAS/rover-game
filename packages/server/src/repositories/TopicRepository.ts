import { TopicModel } from '../models/TopicModel'
import type { Transaction } from 'sequelize'
import { sequelize } from '../../db'

interface ITopicRepository {
  save(
    name: string,
    userId: number,
    categoryId: number,
    transaction?: Transaction
  ): Promise<TopicModel>
  getAll(
    categoryId: number,
    limit?: number,
    offset?: number,
    search?: string
  ): Promise<Array<TopicModel>>
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
    offset?: number,
    search = ''
  ): Promise<Array<TopicModel>> {
    try {
      return await TopicModel.findAll({
        where: {
          categoryId: categoryId,
          name: sequelize.where(
            sequelize.fn('LOWER', sequelize.col('name')),
            'LIKE',
            `%${search.toLowerCase()}%`
          ),
        },
        order: [['updatedAt', 'DESC']],
        offset,
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
