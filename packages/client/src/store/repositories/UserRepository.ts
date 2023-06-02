import { getUser } from '../../utils/rest-api/auth-api'
import { UserExtended } from '../../utils/types/user'

export interface IUserRepository {
  getCurrentUser(): Promise<UserExtended>
}

export class UserRepository implements IUserRepository {
  async getCurrentUser(): Promise<UserExtended> {
    return await getUser()
  }
}
