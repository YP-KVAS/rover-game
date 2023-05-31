import { UserModel } from '../models/UserModel'
import { RoleModel } from '../models/RoleModel'

export interface IUserRepository {
  save(user: UserModel): Promise<void>
  update(user: UserModel): Promise<void>
  delete(userId: number): Promise<void>
  getById(userId: number): Promise<UserModel | null>
  getAll(): Promise<UserModel[]>
}

export class UserRepository implements IUserRepository {
  async save(user: UserModel): Promise<void> {
    try {
      await UserModel.create({ id: user.id, roleId: user.roleId })
    } catch (err) {
      throw new Error('CREATE: Failed to create a new user')
    }
  }

  async update(user: UserModel): Promise<void> {
    try {
      const userToUpdate = await UserModel.findOne({
        where: {
          id: user.id,
        },
      })

      if (!userToUpdate) {
        throw new Error(`UPDATE: User with id ${user.id} was not found`)
      }

      userToUpdate.roleId = user.roleId
      userToUpdate.score = user.score

      await userToUpdate.save()
    } catch (err) {
      throw new Error(`UPDATE: Failed to update user with id ${user.id}`)
    }
  }

  async delete(userId: number): Promise<void> {
    try {
      const userToDelete = await UserModel.findOne({
        where: {
          id: userId,
        },
      })

      if (!userToDelete) {
        throw new Error(`DELETE: User with id ${userId} was not found`)
      }

      await userToDelete.destroy()
    } catch (err) {
      throw new Error(`DELETE: Failed to delete user with id ${userId}`)
    }
  }

  async getById(userId: number): Promise<UserModel | null> {
    try {
      return await UserModel.findOne({
        where: {
          id: userId,
        },
        include: [{ model: RoleModel, attributes: ['name'] }],
      })
    } catch (err) {
      throw new Error(`GET: Failed to get user by id ${userId}`)
    }
  }

  async getAll(): Promise<UserModel[]> {
    try {
      return await UserModel.findAll({
        order: [['score', 'DESC']],
      })
    } catch (err) {
      throw new Error('GET: Failed to get all users')
    }
  }
}
