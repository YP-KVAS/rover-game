import { CommentModel } from '../models/CommentModel'
import type { Transaction } from 'sequelize'
import type { CreateComment } from '../utils/types/dto'
import { Op } from 'sequelize'

export interface ICommentRepository {
  save(comment: CreateComment, transaction?: Transaction): Promise<CommentModel>
  getAll(
    topicId: number,
    parentCommentId: number | null,
    limit?: number,
    offset?: number
  ): Promise<Array<CommentModel>>
  countReplies(parentCommentId: number): Promise<number>
  countTotalByTopicId(topicId: number): Promise<number>
  update(comment: CommentModel): Promise<CommentModel>
  delete(commentId: number): Promise<void>
  getById(commentId: number): Promise<CommentModel | null>
}

export class CommentRepository implements ICommentRepository {
  async save(
    comment: CreateComment,
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

  async countReplies(parentCommentId: number): Promise<number> {
    return await CommentModel.count({ where: { parentCommentId } })
  }

  async countTotalByTopicId(topicId: number): Promise<number> {
    return await CommentModel.count({
      where: { [Op.and]: [{ topicId }, { parentCommentId: null }] },
    })
  }

  async getAll(
    topicId: number,
    parentCommentId: number | null,
    limit?: number,
    offset?: number
  ): Promise<Array<CommentModel>> {
    try {
      return await CommentModel.findAll({
        where: { [Op.and]: [{ topicId }, { parentCommentId }] },
        offset,
        limit,
        order: [['createdAt', 'ASC']],
      })
    } catch (err) {
      throw new Error(
        `GET: Failed to get all comments for topic with id ${topicId}, parentCommentId ${parentCommentId}`
      )
    }
  }

  async update(comment: CommentModel): Promise<CommentModel> {
    try {
      const commentToUpdate = await CommentModel.findOne({
        where: {
          id: comment.id,
        },
      })

      if (!commentToUpdate) {
        throw new Error(`UPDATE: Comment with id ${comment.id} was not found`)
      }

      commentToUpdate.message = comment.message
      return await commentToUpdate.save()
    } catch (err) {
      throw new Error(`UPDATE: Failed to update comment with id ${comment.id}`)
    }
  }

  async delete(commentId: number): Promise<void> {
    try {
      const commentToDelete = await CommentModel.findOne({
        where: {
          id: commentId,
        },
      })

      if (!commentToDelete) {
        throw new Error(`DELETE: Comment with id ${commentId} was not found`)
      }

      commentToDelete.message = null
      await commentToDelete.save()
    } catch (err) {
      throw new Error(`DELETE: Failed to delete comment with id ${commentId}`)
    }
  }

  async getById(commentId: number): Promise<CommentModel | null> {
    try {
      return await CommentModel.findOne({
        where: {
          id: commentId,
        },
      })
    } catch (err) {
      throw new Error(`GET: Failed to get comment by id ${commentId}`)
    }
  }
}
