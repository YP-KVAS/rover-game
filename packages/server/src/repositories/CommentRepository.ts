import { CommentModel } from '../models/CommentModel'
import type { Transaction } from 'sequelize'
import type { CommentDTO } from '../utils/types/dto'

interface ICommentRepository {
  save(
    comment: Omit<CommentDTO, 'id' | 'createdAt' | 'updatedAt'>,
    transaction?: Transaction
  ): Promise<CommentModel>
}

export class CommentRepository implements ICommentRepository {
  async save(
    comment: Omit<CommentDTO, 'id' | 'createdAt' | 'updatedAt'>,
    transaction?: Transaction
  ): Promise<CommentModel> {
    const { message, parentCommentId, userId, topicId } = comment
    try {
      return await CommentModel.create(
        {
          message,
          userId,
          topicId,
          parentCommentId: parentCommentId || null,
        },
        { transaction }
      )
    } catch (err) {
      throw new Error('CREATE: Failed to create a new comment')
    }
  }
}
