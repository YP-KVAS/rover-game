import type { User } from '../utils/types/user'
import type { ApiError } from '../utils/types/api'
import { userService } from '../services/UserService'

interface IThunkUserRepository {
  getCurrentUser(): Promise<User | ApiError>
}

export class ThunkUserRepository implements IThunkUserRepository {
  constructor(private _cookie?: string) {}

  async getCurrentUser() {
    return await userService.findUser(this._cookie)
  }
}
