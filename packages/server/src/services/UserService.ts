import { IRoleRepository, RoleRepository } from '../repositories/RoleRepository'
import { RolesEnum } from '../utils/types/api'
import { UserModel } from '../models/UserModel'
import { IUserRepository, UserRepository } from '../repositories/UserRepository'
import { RoleModel } from '../models/RoleModel'

export class UserService {
  constructor(
    private _userRepository: IUserRepository,
    private _roleRepository: IRoleRepository
  ) {}

  // save user to rover-db if not exists, return user
  private async _getUser(id: number): Promise<UserModel> {
    let user = await this._userRepository.getById(id)

    if (!user) {
      let role = await this._roleRepository.getByName(RolesEnum.REGULAR)

      // save role if not exists
      if (!role) {
        role = new RoleModel()
        role.name = RolesEnum.REGULAR
        await this._roleRepository.save(role)

        role = await this._roleRepository.getByName(RolesEnum.REGULAR)
      }

      user = new UserModel()
      user.id = id
      user.roleId = role?.id

      await this._userRepository.save(user)
    }

    return user
  }

  async findRoleById(id: number): Promise<RolesEnum | null> {
    const user = await this._getUser(id)
    return user.role.name
  }
}

export const userService = new UserService(
  new UserRepository(),
  new RoleRepository()
)
