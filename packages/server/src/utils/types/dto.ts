import type { TopicModel } from '../../models/TopicModel'

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

export interface CommentDTO extends Timestamp {
  id: number
  message: string
  parentCommentId: number | null
  userId: number
  topicId: number
}
