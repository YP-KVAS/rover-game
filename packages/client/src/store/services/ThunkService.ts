import { IUserService } from './UserService'

export interface IThunkService {
  userService: IUserService
}

export class ThunkService implements IThunkService {
  userService: IUserService

  constructor(userService: IUserService) {
    this.userService = userService
  }
}
