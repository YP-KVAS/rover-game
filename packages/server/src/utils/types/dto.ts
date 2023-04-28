import type { TopicModel } from '../../models/TopicModel'
import type { CommentModel } from '../../models/CommentModel'

interface Timestamp {
  createdAt: string
  updatedAt: string
}

export interface TopicDTO extends Timestamp {
  id: number
  name: string
  categoryId: number
  userId: number
}

export const getTopicDTOFromModel = (model: TopicModel): TopicDTO => {
  const { id, name, categoryId, userId, createdAt, updatedAt } = model
  return { id, name, categoryId, userId, createdAt, updatedAt }
}

export interface CreateComment {
  message: string | null
  userId: number
  topicId: number
  parentCommentId: number | null
}

export interface CommentDTO extends Timestamp, CreateComment {
  id: number
  replyCount: number
}

export const getCommentDTOFromModel = (
  model: CommentModel,
  replyCount: number
): CommentDTO => {
  const {
    id,
    message,
    parentCommentId,
    topicId,
    userId,
    createdAt,
    updatedAt,
  } = model
  return {
    id,
    message,
    parentCommentId,
    topicId,
    userId,
    createdAt,
    updatedAt,
    replyCount,
  }
}
