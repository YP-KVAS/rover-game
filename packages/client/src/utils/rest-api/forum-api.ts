import {
  AddForumComment,
  IForumCategory,
  IForumComment,
  IForumTopic,
  NewTopic,
} from '../types/forum'
import {
  FORUM_CATEGORIES,
  FORUM_COMMENTS,
  FORUM_TOPICS,
} from '../fake-forum-data'
import { FormInputNames } from '../types/forms'

// TODO: implement Forum API (Sprint 8)

const TIMEOUT = 500

export function getForumCategories(): Promise<Array<IForumCategory>> {
  return new Promise(resolve => {
    setTimeout(() => resolve(FORUM_CATEGORIES), TIMEOUT)
  })
}

export function getForumTopics(
  categoryId: number
): Promise<Array<IForumTopic>> {
  return new Promise(resolve => {
    setTimeout(() => resolve(FORUM_TOPICS[categoryId]), TIMEOUT)
  })
}

export function addForumTopic(data: NewTopic): Promise<IForumTopic> {
  return new Promise(resolve => {
    setTimeout(() => {
      const id: number = Date.now()
      const categoryId: number = +(
        window.location.pathname.split('/').pop() || 0
      )

      const topic: IForumTopic = {
        id,
        category_id: categoryId,
        date: new Date().toISOString(),
        topic_name: data[FormInputNames.FORUM_TITLE],
      }

      FORUM_TOPICS[categoryId] = [...FORUM_TOPICS[categoryId], topic]

      return resolve(topic)
    }, TIMEOUT)
  })
}

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
