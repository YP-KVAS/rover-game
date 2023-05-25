import { IForumRepository } from '../repositories/ForumRepository'
import {
  IForumCategory,
  IForumComments,
  IForumTopic,
  IGetForumCommentsQuery,
  IGetForumTopicsQuery,
} from '../../utils/types/forum'

export interface IForumService {
  getCategories(): Promise<IForumCategory[]>
  getTopics(topicsQuery: IGetForumTopicsQuery): Promise<IForumTopic[]>
  getComments(commentsQuery: IGetForumCommentsQuery): Promise<IForumComments>
}

export class ForumService implements ForumService {
  constructor(private _repo: IForumRepository) {}

  async getCategories() {
    return this._repo.getCategories()
  }

  async getTopics(topicsQuery: IGetForumTopicsQuery) {
    return this._repo.getTopics(topicsQuery)
  }

  async getComments(commentsQuery: IGetForumCommentsQuery) {
    return this._repo.getComments(commentsQuery)
  }
}
