import type { ForumCommentsQuery, ForumTopicsQuery } from '../utils/types/query'
import type { CategoryDTO, Comments, TopicDTO } from '../utils/types/dto'
import { categoryService } from '../services/CategoryService'
import { topicService } from '../services/TopicService'
import { commentService } from '../services/CommentService'
import { ThunkUserRepository } from './ThunkUserRepository'
import { instanceOfApiError } from '../utils/types/api'

interface IThunkForumRepository {
  getCategories(): Promise<Array<CategoryDTO>>
  getTopics(topicsQuery: ForumTopicsQuery): Promise<Array<TopicDTO>>
  getComments(commentsQuery: ForumCommentsQuery): Promise<Comments>
}

export class ThunkForumRepository implements IThunkForumRepository {
  thunkUserRepository

  constructor(private _cookie?: string) {
    this.thunkUserRepository = new ThunkUserRepository(this._cookie)
  }

  async getCategories(): Promise<Array<CategoryDTO>> {
    const userOrErr = await this.thunkUserRepository.getCurrentUser()

    if (!instanceOfApiError(userOrErr)) {
      return await categoryService.findAll()
    }
    return []
  }

  async getTopics(topicsQuery: ForumTopicsQuery): Promise<Array<TopicDTO>> {
    const userOrErr = await this.thunkUserRepository.getCurrentUser()

    if (!instanceOfApiError(userOrErr)) {
      const { categoryId, limit, offset, search } = topicsQuery
      return await topicService.findAll(categoryId, limit, offset, search)
    }
    return []
  }

  async getComments(commentsQuery: ForumCommentsQuery): Promise<Comments> {
    const userOrErr = await this.thunkUserRepository.getCurrentUser()

    if (!instanceOfApiError(userOrErr)) {
      const { topicId, parentCommentId, limit, offset } = commentsQuery
      return await commentService.findAll(
        topicId,
        parentCommentId,
        this._cookie,
        limit,
        offset
      )
    }
    return { comments: [], total: 0 }
  }
}
