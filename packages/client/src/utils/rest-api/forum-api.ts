import { IForumCategory } from '../types/forum'
import { FORUM_CATEGORIES } from '../fake-forum-data'

// TODO: implement Forum API (Sprint 8)

const TIMEOUT = 500

export function getForumCategories(): Promise<Array<IForumCategory>> {
  return new Promise(resolve => {
    setTimeout(() => resolve(FORUM_CATEGORIES), TIMEOUT)
  })
}
