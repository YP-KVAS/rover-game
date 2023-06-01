import {
  IAddForumCommentQuery,
  IAddForumTopicQuery,
  IForumCategory,
  IForumComment,
  IForumTopic,
  IGetForumCommentsQuery,
  IForumComments,
  IGetForumTopicsQuery,
  IUpdateForumTopicQuery,
} from '../types/forum'
import { FetchMethods, request } from './base-request'
import {
  BASE_SERVER_URL,
  FORUM_CATEGORIES_API_URL,
  FORUM_COMMENTS_API_URL,
  FORUM_TOPICS_API_URL,
  TOPICS_LOAD_LIMIT,
} from '../const-variables/api'
import { stringifyQuery } from '../stringify-query'

// categories

export async function getForumCategories(): Promise<IForumCategory[]> {
  return await request(BASE_SERVER_URL, FORUM_CATEGORIES_API_URL, {
    method: FetchMethods.GET,
    noCached: true,
  })
}

export async function addForumCategory(name: string): Promise<IForumCategory> {
  return await request(BASE_SERVER_URL, FORUM_CATEGORIES_API_URL, {
    method: FetchMethods.POST,
    data: { name },
  })
}

export async function updateForumCategory(
  id: number,
  name: string
): Promise<IForumCategory> {
  return await request(BASE_SERVER_URL, `${FORUM_CATEGORIES_API_URL}/${id}`, {
    method: FetchMethods.PUT,
    data: { name },
  })
}

export async function deleteForumCategory(id: number): Promise<void> {
  return await request(BASE_SERVER_URL, `${FORUM_CATEGORIES_API_URL}/${id}`, {
    method: FetchMethods.DELETE,
  })
}

// topics

export async function getForumTopics(
  topicsQuery: IGetForumTopicsQuery
): Promise<IForumTopic[]> {
  const {
    categoryId,
    offset = 0,
    limit = TOPICS_LOAD_LIMIT,
    search = '',
  } = topicsQuery
  return await request(
    BASE_SERVER_URL,
    `${FORUM_CATEGORIES_API_URL}/${categoryId}${FORUM_TOPICS_API_URL}${stringifyQuery(
      { limit, offset, search }
    )}`,
    {
      method: FetchMethods.GET,
      noCached: true,
    }
  )
}

export async function addForumTopic(
  topic: IAddForumTopicQuery
): Promise<IForumTopic> {
  const { categoryId, topicName, ...restData } = topic
  return await request(
    BASE_SERVER_URL,
    `${FORUM_CATEGORIES_API_URL}/${categoryId}${FORUM_TOPICS_API_URL}`,
    {
      method: FetchMethods.POST,
      data: { ...restData, name: topicName },
    }
  )
}

export async function updateForumTopic(
  topic: IUpdateForumTopicQuery
): Promise<IForumTopic> {
  return await request(BASE_SERVER_URL, `${FORUM_TOPICS_API_URL}/${topic.id}`, {
    method: FetchMethods.PATCH,
    data: { name: topic.name, categoryId: topic.newCategoryId },
  })
}

export async function deleteForumTopic(id: number): Promise<void> {
  return await request(BASE_SERVER_URL, `${FORUM_TOPICS_API_URL}/${id}`, {
    method: FetchMethods.DELETE,
  })
}

// comments

export async function getForumComments(
  commentsQuery: IGetForumCommentsQuery
): Promise<IForumComments> {
  const { topicId, parentCommentId, offset = 0, limit } = commentsQuery
  return await request(
    BASE_SERVER_URL,
    `${FORUM_TOPICS_API_URL}/${topicId}${FORUM_COMMENTS_API_URL}${stringifyQuery(
      { limit, offset, parentCommentId }
    )}`,
    {
      method: FetchMethods.GET,
      noCached: true,
    }
  )
}

export async function addForumComment(
  comment: IAddForumCommentQuery
): Promise<IForumComment> {
  const { topicId, ...restData } = comment
  return await request(
    BASE_SERVER_URL,
    `${FORUM_TOPICS_API_URL}/${topicId}${FORUM_COMMENTS_API_URL}`,
    {
      method: FetchMethods.POST,
      data: { ...restData },
    }
  )
}

export async function updateForumComment(
  id: number,
  message: string
): Promise<IForumComment> {
  return await request(BASE_SERVER_URL, `${FORUM_COMMENTS_API_URL}/${id}`, {
    method: FetchMethods.PATCH,
    data: { message },
  })
}

export async function deleteForumComment(id: number): Promise<void> {
  return await request(BASE_SERVER_URL, `${FORUM_COMMENTS_API_URL}/${id}`, {
    method: FetchMethods.DELETE,
  })
}
