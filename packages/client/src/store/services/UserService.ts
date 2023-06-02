import { IUserRepository } from '../repositories/UserRepository'
import { UserExtended } from '../../utils/types/user'

export interface IUserService {
  getCurrentUser(): Promise<UserExtended>
}

export class UserService implements IUserService {
  constructor(private _repo: IUserRepository) {}

  async getCurrentUser() {
    return this._repo.getCurrentUser()
  }
}
