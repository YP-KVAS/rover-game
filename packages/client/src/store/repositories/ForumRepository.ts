import {
  IForumCategory,
  IForumComments,
  IForumTopic,
  IGetForumCommentsQuery,
  IGetForumTopicsQuery,
} from '../../utils/types/forum'
import {
  getForumCategories,
  getForumComments,
  getForumTopics,
} from '../../utils/rest-api/forum-api'

export interface IForumRepository {
  getCategories(): Promise<Array<IForumCategory>>
  getTopics(topicsQuery: IGetForumTopicsQuery): Promise<Array<IForumTopic>>
  getComments(commentsQuery: IGetForumCommentsQuery): Promise<IForumComments>
}

export class ForumRepository implements IForumRepository {
  async getCategories(): Promise<Array<IForumCategory>> {
    return await getForumCategories()
  }

  async getTopics(
    topicsQuery: IGetForumTopicsQuery
  ): Promise<Array<IForumTopic>> {
    return await getForumTopics(topicsQuery)
  }

  async getComments(
    commentsQuery: IGetForumCommentsQuery
  ): Promise<IForumComments> {
    return await getForumComments(commentsQuery)
  }
}
