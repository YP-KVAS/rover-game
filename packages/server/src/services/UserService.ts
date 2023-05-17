import { IRoleRepository, RoleRepository } from '../repositories/RoleRepository'
import { ApiError, instanceOfApiError, RolesEnum } from '../utils/types/api'
import { UserModel } from '../models/UserModel'
import { IUserRepository, UserRepository } from '../repositories/UserRepository'
import { RoleModel } from '../models/RoleModel'
import type { User, UserWithRole } from '../utils/types/user'
import { getUser } from '../utils/yandex-api/user-api'

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

  async findUserRole(id: number): Promise<RolesEnum | null> {
    const user = await this._getUser(id)
    return user.role.name
  }

  async findUserWithRole(
    cookies?: string,
    user?: User,
    role?: RolesEnum
  ): Promise<UserWithRole> {
    let yaUser: User | ApiError | undefined = user
    if (!user) {
      yaUser = await getUser(cookies)
    }

    if (yaUser && instanceOfApiError(yaUser)) {
      throw new Error((yaUser as ApiError).reason)
    }

    const userId = (yaUser as User).id

    let userRole: RolesEnum | null | undefined = role
    if (!userRole) {
      userRole = await this.findUserRole(userId)
      if (!userRole) {
        throw new Error(`Unable to get role for user with id ${userId}`)
      }
    }

    const {
      id,
      login,
      first_name,
      second_name,
      email,
      phone,
      display_name,
      avatar,
    } = yaUser as User
    return {
      id,
      login,
      first_name,
      second_name,
      email,
      phone,
      display_name,
      avatar,
      role: userRole,
    }
  }
}

export const userService = new UserService(
  new UserRepository(),
  new RoleRepository()
)
