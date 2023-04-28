import { FormInputNames } from './forms'

export interface IForumCategory {
  id: number
  name: string
  topicCount: number
}

export interface IUpdateForumTopic {
  id: number
  name: string
  newCategoryId: number
}

export interface IForumTopic {
  id: number
  name: string
  categoryId: number
  createdAt: string
  userId: number
}

interface GetForumItems {
  offset?: number
  limit?: number
  search?: string
}

export interface IGetForumTopics extends GetForumItems {
  categoryId: number
}

export interface IGetForumComments extends GetForumItems {
  topicId: number
  parentCommentId: number | null
}

export interface IGetForumCommentsRes {
  comments: Array<IForumComment>
  total: number
}

export interface IAddForumComment {
  message: string | null
  topicId: number
  parentCommentId: number | null
  userId: number
}

export interface IForumComment extends IAddForumComment {
  id: number
  createdAt: string
  replyCount: number
}

export interface NewTopic extends Record<string, unknown> {
  [FormInputNames.FORUM_TOPIC_TITLE]: string
  [FormInputNames.FORUM_MESSAGE]: string
}

export interface IAddTopic extends NewTopic {
  userId: number
  categoryId: number
}
