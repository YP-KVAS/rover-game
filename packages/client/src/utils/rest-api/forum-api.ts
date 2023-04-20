import {
  AddForumComment,
  IForumCategory,
  IForumComment,
  IForumTopic,
  NewTopic,
  UpdateForumComment,
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

export function addForumTopic(
  data: NewTopic & { userId: number }
): Promise<IForumTopic> {
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
        user_id: data.userId,
      }

      if (!FORUM_TOPICS[categoryId]) {
        FORUM_TOPICS[categoryId] = []
      }

      FORUM_TOPICS[categoryId] = [...FORUM_TOPICS[categoryId], topic]

      return resolve(topic)
    }, TIMEOUT)
  })
}

export function updateForumTopic(newName: string): Promise<IForumTopic> {
  return new Promise(resolve => {
    const paths = window.location.pathname.split('/')
    const categoryId = paths[2]
    const topicId = paths[3]
    const topicToUpdate = FORUM_TOPICS[+categoryId].find(
      topic => topic.id === +topicId
    )
    FORUM_TOPICS[+categoryId] = FORUM_TOPICS[+categoryId].map(topic =>
      topic.id === +topicId ? { ...topic, topic_name: newName } : topic
    )
    if (topicToUpdate) {
      setTimeout(() => resolve(topicToUpdate), TIMEOUT)
    }
  })
}

export function deleteForumTopic(): Promise<void> {
  return new Promise(resolve => {
    const paths = window.location.pathname.split('/')
    const categoryId = paths[2]
    const topicId = paths[3]
    FORUM_TOPICS[+categoryId] = FORUM_TOPICS[+categoryId].filter(
      topic => topic.id !== +topicId
    )
    setTimeout(() => resolve(), TIMEOUT)
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
