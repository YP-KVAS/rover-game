import { User } from '../../utils/types/user'
import { getUser } from '../../utils/rest-api/auth-api'

export interface IUserRepository {
  getCurrentUser(): Promise<User>
}

export class UserRepository implements IUserRepository {
  async getCurrentUser(): Promise<User> {
    return await getUser()
  }
}
