import { FormInputNames } from './forms'

export interface IForumCategory {
  id: number
  name: string
  topicCount: number
}

export interface IUpdateForumTopicQuery {
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

interface IGetForumItemsBaseQuery {
  offset?: number
  limit?: number
  search?: string
}

export interface IGetForumTopicsQuery extends IGetForumItemsBaseQuery {
  categoryId: number
}

export interface IGetForumCommentsQuery extends IGetForumItemsBaseQuery {
  topicId: number
  parentCommentId: number | null
}

export interface IGetForumCommentsRes {
  comments: Array<IForumComment>
  total: number
}

export interface IAddForumCommentQuery {
  message: string | null
  topicId: number
  parentCommentId: number | null
  userId: number
}

export interface IForumComment extends IAddForumCommentQuery {
  id: number
  createdAt: string
  replyCount: number
}

export interface NewTopic extends Record<string, unknown> {
  [FormInputNames.FORUM_TOPIC_TITLE]: string
  [FormInputNames.FORUM_MESSAGE]: string
}

export interface IAddForumTopicQuery extends NewTopic {
  userId: number
  categoryId: number
}
