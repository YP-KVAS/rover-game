import { IRoleRepository, RoleRepository } from '../repositories/RoleRepository'
import { RolesEnum } from '../utils/types/api'
import { UserModel } from '../models/UserModel'
import { IUserRepository, UserRepository } from '../repositories/UserRepository'

export class UserService {
  constructor(
    private _userRepository: IUserRepository,
    private _roleRepository: IRoleRepository
  ) {}

  async findRoleById(id: number): Promise<RolesEnum | null> {
    let user = await this._userRepository.getById(id)

    if (!user) {
      const role = await this._roleRepository.getByName(RolesEnum.REGULAR)

      if (!role) {
        return null
      }

      user = new UserModel()
      user.id = id
      user.roleId = role.id

      await this._userRepository.save(user)
    }

    return user.role.name
  }
}

export const userService = new UserService(
  new UserRepository(),
  new RoleRepository()
)
