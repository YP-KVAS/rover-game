import { sequelize } from '../../db'
import { TopicModel } from '../models/TopicModel'
import type { TopicDTO } from '../utils/types/dto'
import { getTopicDTOFromModel } from '../utils/types/dto'
import { TopicRepository } from '../repositories/TopicRepository'
import { CategoryRepository } from '../repositories/CategoryRepository'
import { CommentRepository } from '../repositories/CommentRepository'

const topicRepository = new TopicRepository()
const categoryRepository = new CategoryRepository()
const commentRepository = new CommentRepository()

export class TopicService {
  async findAll(
    id: number,
    limit?: number,
    offset?: number,
    search?: string
  ): Promise<Array<TopicDTO>> {
    const topics = await topicRepository.getAll(id, limit, offset, search)
    return topics.map(topic => getTopicDTOFromModel(topic))
  }

  async findById(id: number): Promise<TopicModel | null> {
    return await topicRepository.getById(id)
  }

  async create(
    name: string,
    userId: number,
    categoryId: number,
    message: string
  ): Promise<TopicModel> {
    const transaction = await sequelize.transaction()
    try {
      const topic = await topicRepository.save(
        name,
        userId,
        categoryId,
        transaction
      )
      await categoryRepository.incrementTopics(categoryId, transaction)
      await commentRepository.save(
        { message, userId, topicId: topic.id, parentCommentId: null },
        transaction
      )

      await transaction.commit()
      return topic
    } catch (err) {
      await transaction.rollback()
      throw new Error('CreateTopic: Transaction rollback')
    }
  }

  async update(
    id: number,
    name?: string,
    categoryId?: number
  ): Promise<TopicDTO> {
    const topicToUpdate = new TopicModel()
    topicToUpdate.id = id

    if (name) {
      topicToUpdate.name = name
    }
    if (categoryId) {
      topicToUpdate.categoryId = categoryId
    }

    const topic = await topicRepository.update(topicToUpdate)
    return getTopicDTOFromModel(topic)
  }

  async delete(id: number): Promise<void> {
    return await topicRepository.delete(id)
  }
}
