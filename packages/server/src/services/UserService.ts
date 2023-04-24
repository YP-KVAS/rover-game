import { RoleRepository } from '../repositories/RoleRepository'
import { RolesEnum } from '../utils/types/api'
import { UserModel } from '../models/UserModel'
import { UserRepository } from '../repositories/UserRepository'

const userRepository = new UserRepository()
const roleRepository = new RoleRepository()

export class UserService {
  async findRoleById(id: number): Promise<RolesEnum | null> {
    let user = await userRepository.getById(id)

    if (!user) {
      const role = await roleRepository.getByName(RolesEnum.REGULAR)

      if (!role) {
        return null
      }

      user = new UserModel()
      user.id = id
      user.roleId = role.id

      await userRepository.save(user)
    }

    return user.role.name
  }
}
