import { sequelize } from '../../db'
import { TopicModel } from '../models/TopicModel'
import type { TopicDTO } from '../utils/types/dto'
import { getTopicDTOFromModel } from '../utils/types/dto'
import {
  ITopicRepository,
  TopicRepository,
} from '../repositories/TopicRepository'
import {
  CategoryRepository,
  ICategoryRepository,
} from '../repositories/CategoryRepository'
import {
  CommentRepository,
  ICommentRepository,
} from '../repositories/CommentRepository'

export class TopicService {
  constructor(
    private _topicRepository: ITopicRepository,
    private _categoryRepository: ICategoryRepository,
    private _commentRepository: ICommentRepository
  ) {}

  async findAll(
    id: number,
    limit?: number,
    offset?: number,
    search?: string
  ): Promise<Array<TopicDTO>> {
    const topics = await this._topicRepository.getAll(id, limit, offset, search)
    return topics.map(topic => getTopicDTOFromModel(topic))
  }

  async findById(id: number): Promise<TopicModel | null> {
    return await this._topicRepository.getById(id)
  }

  async create(
    name: string,
    userId: number,
    categoryId: number,
    message: string
  ): Promise<TopicModel> {
    const transaction = await sequelize.transaction()
    try {
      const topic = await this._topicRepository.save(
        name,
        userId,
        categoryId,
        transaction
      )
      await this._categoryRepository.incrementTopics(categoryId, transaction)
      await this._commentRepository.save(
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

    if (!categoryId) {
      const topic = await this._topicRepository.update(topicToUpdate)
      return getTopicDTOFromModel(topic)
    }

    const transaction = await sequelize.transaction()
    try {
      topicToUpdate.categoryId = categoryId
      const oldTopic = await this._topicRepository.getById(id)

      if (!oldTopic) {
        throw new Error(`Topic with id ${id} was not found`)
      }

      const topic = await this._topicRepository.update(topicToUpdate)
      await this._categoryRepository.incrementTopics(
        topic.categoryId,
        transaction
      )
      await this._categoryRepository.decrementTopics(
        oldTopic.categoryId,
        transaction
      )

      await transaction.commit()

      return getTopicDTOFromModel(topic)
    } catch (err) {
      await transaction.rollback()
      throw new Error('UpdateTopic: Transaction rollback')
    }
  }

  async delete(id: number): Promise<void> {
    const transaction = await sequelize.transaction()
    try {
      const topicToDelete = await this._topicRepository.getById(id)
      if (!topicToDelete) {
        throw new Error(`Topic with id ${id} was not found`)
      }

      await this._topicRepository.delete(id)
      await this._categoryRepository.decrementTopics(
        topicToDelete.categoryId,
        transaction
      )

      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw new Error('DeleteTopic: Transaction rollback')
    }
  }
}

export const topicService = new TopicService(
  new TopicRepository(),
  new CategoryRepository(),
  new CommentRepository()
)
