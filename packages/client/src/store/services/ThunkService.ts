import { IUserService } from './UserService'
import { IForumService } from './ForumService'
import { ILeaderboardService } from './LeaderboadService'

export interface IThunkService {
  userService: IUserService
  forumService: IForumService
  leaderboardService: ILeaderboardService
}

export class ThunkService implements IThunkService {
  userService: IUserService
  forumService: IForumService
  leaderboardService: ILeaderboardService

  constructor(
    userService: IUserService,
    forumService: IForumService,
    leaderboardService: ILeaderboardService
  ) {
    this.userService = userService
    this.forumService = forumService
    this.leaderboardService = leaderboardService
  }
}
