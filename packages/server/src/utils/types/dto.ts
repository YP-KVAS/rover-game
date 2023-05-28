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

export interface CreateCommentInfo {
  message: string | null
  userId: number
  topicId: number
  parentCommentId: number | null
  emojiHappyFace: number
  emojiSadFace: number
  emojiAngryFace: number
  emojiLike: number
  emojiDislike: number
}

export interface CommentDTO extends Timestamp, CreateCommentInfo {
  id: number
  replyCount: number
}

export interface CommentWithAuthorDTO extends CommentDTO {
  author: {
    name: string | null
    avatar: string | null
  }
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
    emojiHappyFace,
    emojiSadFace,
    emojiAngryFace,
    emojiLike,
    emojiDislike,
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
    emojiHappyFace,
    emojiSadFace,
    emojiAngryFace,
    emojiLike,
    emojiDislike,
  }
}

export interface Comments {
  comments: CommentWithAuthorDTO[]
  total: number
}
