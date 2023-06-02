import { IRoleRepository, RoleRepository } from '../repositories/RoleRepository'
import { ApiError, instanceOfApiError, RolesEnum } from '../utils/types/api'
import { UserModel } from '../models/UserModel'
import { IUserRepository, UserRepository } from '../repositories/UserRepository'
import { RoleModel } from '../models/RoleModel'
import type { User, UserExtended } from '../utils/types/user'
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
      user = (await this._userRepository.getById(id)) as UserModel
    }

    return user
  }

  async findRoverUser(id: number): Promise<UserModel | null> {
    return await this._getUser(id)
  }

  async findUser(
    cookies?: string,
    user?: User,
    roverUser?: UserModel
  ): Promise<UserExtended> {
    let yaUser: User | ApiError | undefined = user
    if (!user) {
      yaUser = await getUser(cookies)
    }

    if (yaUser && instanceOfApiError(yaUser)) {
      throw new Error((yaUser as ApiError).reason)
    }

    const userId = (yaUser as User).id

    let roverDbUser: UserModel | null | undefined = roverUser
    if (!roverDbUser) {
      roverDbUser = await this.findRoverUser(userId)
      if (!roverDbUser) {
        throw new Error(`Unable to find user with id ${userId}`)
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
    const { role, bestScore } = roverDbUser

    return {
      id,
      login,
      first_name,
      second_name,
      email,
      phone,
      display_name,
      avatar,
      role: role.name,
      best_score: bestScore,
    }
  }
}

export const userService = new UserService(
  new UserRepository(),
  new RoleRepository()
)
