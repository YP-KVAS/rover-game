import { IUserRepository } from '../repositories/UserRepository'
import { UserWithRole } from '../../utils/types/user'

export interface IUserService {
  getCurrentUser(): Promise<UserWithRole>
}

export class UserService implements IUserService {
  constructor(private _repo: IUserRepository) {}

  async getCurrentUser() {
    return this._repo.getCurrentUser()
  }
}
