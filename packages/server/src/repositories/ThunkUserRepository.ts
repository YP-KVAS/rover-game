import type { User } from '../utils/types/user'
import type { ApiError } from '../utils/types/api'
import { getUser } from '../utils/yandex-api/auth-api'

interface IThunkUserRepository {
  getCurrentUser(): Promise<User | ApiError>
}

export class ThunkUserRepository implements IThunkUserRepository {
  constructor(private _cookie?: string) {}

  async getCurrentUser() {
    return await getUser(this._cookie)
  }
}
