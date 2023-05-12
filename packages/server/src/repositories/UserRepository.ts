import type { User } from '../utils/types/user'
import type { ApiError } from '../utils/types/api'
import { getUser } from '../utils/yandex-api/auth-api'

export interface IUserRepository {
  getCurrentUser(): Promise<User | ApiError>
}

export class UserRepository implements IUserRepository {
  constructor(private _cookie?: string) {}

  async getCurrentUser() {
    return await getUser(this._cookie)
  }
}
