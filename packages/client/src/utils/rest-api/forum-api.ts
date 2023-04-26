import {
  AddForumComment,
  IAddTopic,
  IForumCategory,
  IForumComment,
  IForumTopic,
  IGetForumTopic,
  IUpdateForumTopic,
  UpdateForumComment,
} from '../types/forum'
import { FORUM_COMMENTS } from '../fake-forum-data'
import { FetchMethods, request } from './base-request'
import {
  BASE_SERVER_URL,
  FORUM_CATEGORIES_API_URL,
  FORUM_TOPICS_API_URL,
  TOPICS_LOAD_LIMIT,
} from '../const-variables/api'

// TODO: implement Forum API (Sprint 8)

const TIMEOUT = 500

// categories

export async function getForumCategories(): Promise<Array<IForumCategory>> {
  return await request(BASE_SERVER_URL, FORUM_CATEGORIES_API_URL, {
    method: FetchMethods.GET,
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
  topic: IGetForumTopic
): Promise<Array<IForumTopic>> {
  const {
    categoryId,
    offset = 0,
    limit = TOPICS_LOAD_LIMIT,
    search = '',
  } = topic
  return await request(
    BASE_SERVER_URL,
    `${FORUM_CATEGORIES_API_URL}/${categoryId}${FORUM_TOPICS_API_URL}?limit=${limit}&offset=${offset}&search=${search}`,
    {
      method: FetchMethods.GET,
    }
  )
}

export async function addForumTopic(topic: IAddTopic): Promise<IForumTopic> {
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
  topic: IUpdateForumTopic
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

export function getForumComments(
  parent_comment_id: number | null = null
): Promise<Array<IForumComment>> {
  return new Promise(resolve => {
    const comments: Array<IForumComment> = !parent_comment_id
      ? FORUM_COMMENTS[0]
      : !FORUM_COMMENTS[parent_comment_id]
      ? FORUM_COMMENTS[0]?.map(comment => ({
          ...comment,
          id: Math.floor(Date.now() * Math.random()),
          parent_comment_id,
        }))
      : FORUM_COMMENTS[parent_comment_id]
    setTimeout(() => resolve(comments || null), TIMEOUT)
  })
}

export function addForumComment(
  comment: AddForumComment
): Promise<IForumComment> {
  return new Promise(resolve => {
    const newComment = {
      id: Date.now(),
      date: new Date().toISOString(),
      reply_count: 0,
      ...comment,
    }
    if (comment.parent_comment_id) {
      FORUM_COMMENTS[comment.parent_comment_id] ||= []
      FORUM_COMMENTS[comment.parent_comment_id] = [
        ...FORUM_COMMENTS[comment.parent_comment_id],
        newComment,
      ]
    } else {
      FORUM_COMMENTS[0] = [...FORUM_COMMENTS[0], newComment]
    }
    setTimeout(() => resolve(newComment), TIMEOUT)
  })
}

export function updateForumComment(
  comment: UpdateForumComment
): Promise<IForumComment> {
  return new Promise((resolve, reject) => {
    const commentToUpdate = FORUM_COMMENTS[0].find(c => c.id === +comment.id)
    FORUM_COMMENTS[0] = FORUM_COMMENTS[0].map(c =>
      c.id === +comment.id ? { ...c, message: comment.message } : c
    )
    if (commentToUpdate) {
      setTimeout(() => resolve(commentToUpdate), TIMEOUT)
    } else {
      reject('Unknown')
    }
  })
}

export function deleteForumComment(id: number): Promise<void> {
  return new Promise(resolve => {
    FORUM_COMMENTS[0] = FORUM_COMMENTS[0].map(c =>
      c.id === id ? { ...c, message: null } : c
    )
    setTimeout(() => resolve(), TIMEOUT)
  })
}
