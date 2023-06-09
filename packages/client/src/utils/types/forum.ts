import { FormInputNames } from './forms'
import { BaseGetAllItemsQuery } from './base-query'

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
  createdAt: number
  updatedAt: number
  userId: number
}

interface IGetForumItemsBaseQuery extends BaseGetAllItemsQuery {
  search?: string
}

export interface IGetForumTopicsQuery extends IGetForumItemsBaseQuery {
  categoryId: number
  updatedAt?: number
}

export interface IGetForumCommentsQuery extends IGetForumItemsBaseQuery {
  topicId: number
  parentCommentId: number | null
}

export interface IForumComments {
  comments: IForumCommentWithAuthor[]
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
  createdAt: number
  replyCount: number
}

export interface IForumCommentWithAuthor extends IForumComment {
  author: {
    name: string | null
    avatar: string | null
  }
}

export interface NewTopic extends Record<string, unknown> {
  [FormInputNames.FORUM_TOPIC_TITLE]: string
  [FormInputNames.FORUM_MESSAGE]: string
}

export interface IAddForumTopicQuery extends NewTopic {
  userId: number
  categoryId: number
}
