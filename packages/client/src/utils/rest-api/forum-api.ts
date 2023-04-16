import { IForumCategory, IForumTopic, NewTopic } from '../types/forum'
import { FORUM_CATEGORIES, FORUM_TOPICS } from '../fake-forum-data'
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
