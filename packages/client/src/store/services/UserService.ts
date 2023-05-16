import { User } from '../../utils/types/user'
import { IUserRepository } from '../repositories/UserRepository'

export interface IUserService {
  getCurrentUser(): Promise<User>
}

export class UserService implements IUserService {
  constructor(private _repo: IUserRepository) {}

  async getCurrentUser() {
    return this._repo.getCurrentUser()
  }
}
