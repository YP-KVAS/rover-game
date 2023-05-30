import { IUserService } from './UserService'
import { IForumService } from './ForumService'

export interface IThunkService {
  userService: IUserService
  forumService: IForumService
}

export class ThunkService implements IThunkService {
  userService: IUserService
  forumService: IForumService

  constructor(userService: IUserService, forumService: IForumService) {
    this.userService = userService
    this.forumService = forumService
  }
}
