import { getUser } from '../../utils/rest-api/auth-api'
import { UserWithRole } from '../../utils/types/user'

export interface IUserRepository {
  getCurrentUser(): Promise<UserWithRole>
}

export class UserRepository implements IUserRepository {
  async getCurrentUser(): Promise<UserWithRole> {
    return await getUser()
  }
}
