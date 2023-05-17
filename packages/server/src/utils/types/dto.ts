import type { TopicModel } from '../../models/TopicModel'
import type { CommentModel } from '../../models/CommentModel'
import type { CategoryModel } from '../../models/CategoryModel'

interface Timestamp {
  createdAt: string
  updatedAt: string
}

export interface CategoryDTO extends Timestamp {
  id: number
  name: string
  topicCount: number
}

export const getCategoryDTOFromModel = (model: CategoryModel): CategoryDTO => {
  const { id, name, topicCount, createdAt, updatedAt } = model
  return {
    id,
    name,
    topicCount,
    createdAt: createdAt.toString(),
    updatedAt: updatedAt.toString(),
  }
}

export interface TopicDTO extends Timestamp {
  id: number
  name: string
  categoryId: number
  userId: number
}

export const getTopicDTOFromModel = (model: TopicModel): TopicDTO => {
  const { id, name, categoryId, userId, createdAt, updatedAt } = model
  return {
    id,
    name,
    categoryId,
    userId,
    createdAt: createdAt.toString(),
    updatedAt: updatedAt.toString(),
  }
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
    createdAt: createdAt.toString(),
    updatedAt: updatedAt.toString(),
    replyCount,
  }
}

export interface Comments {
  comments: Array<CommentDTO>
  total: number
}
