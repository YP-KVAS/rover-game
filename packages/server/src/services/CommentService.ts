import { CommentModel } from '../models/CommentModel'
import type { CommentDTO } from '../utils/types/dto'
import type { ICommentRepository } from '../repositories/CommentRepository'
import { getCommentDTOFromModel } from '../utils/types/dto'
import { CommentRepository } from '../repositories/CommentRepository'
import sanitizeHtml from 'sanitize-html'

export class CommentService {
  constructor(private _commentRepository: ICommentRepository) {}

  async findAll(
    topicId: number,
    parentCommentId: number | null,
    limit?: number,
    offset?: number
  ): Promise<{ comments: Array<CommentDTO>; total: number }> {
    const comments = await this._commentRepository.getAll(
      topicId,
      parentCommentId,
      limit,
      offset
    )
    const commentsData = comments.map(async comment => {
      const replyCount = await this._commentRepository.countReplies(comment.id)
      return getCommentDTOFromModel(comment, replyCount)
    })

    const total = await this._commentRepository.countTotalByTopicId(topicId)

    return { comments: await Promise.all(commentsData), total }
  }

  async create(
    message: string,
    userId: number,
    topicId: number,
    parentCommentId: number
  ): Promise<CommentDTO> {
    const sanitizedMessage = sanitizeHtml(message, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      allowedAttributes: { img: ['src'] },
      allowedSchemes: ['data', 'http', 'https'],
    })
    const comment = await this._commentRepository.save({
      message: sanitizedMessage,
      userId,
      topicId,
      parentCommentId,
    })

    return getCommentDTOFromModel(comment, 0)
  }

  async update(id: number, message: string): Promise<CommentDTO> {
    const commentToUpdate = new CommentModel()
    commentToUpdate.id = id
    commentToUpdate.message = message

    const comment = await this._commentRepository.update(commentToUpdate)
    const replyCount = await this._commentRepository.countReplies(comment.id)

    return getCommentDTOFromModel(comment, replyCount)
  }

  async delete(id: number): Promise<void> {
    return await this._commentRepository.delete(id)
  }

  async findById(id: number): Promise<CommentModel | null> {
    return await this._commentRepository.getById(id)
  }
}

export const commentService = new CommentService(new CommentRepository())
