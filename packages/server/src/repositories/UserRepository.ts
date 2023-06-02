import { UserModel } from '../models/UserModel'
import { RoleModel } from '../models/RoleModel'
import { Op } from 'sequelize'

export interface IUserRepository {
  save(user: UserModel): Promise<void>
  update(user: UserModel): Promise<UserModel>
  delete(userId: number): Promise<void>
  getById(userId: number): Promise<UserModel | null>
  getAll(
    limit?: number,
    offset?: number,
    orderCondition?: [string, string][],
    whereCondition?: [string, unknown][]
  ): Promise<UserModel[]>
  countPlayers(): Promise<number>
}

export class UserRepository implements IUserRepository {
  async save(user: UserModel): Promise<void> {
    try {
      await UserModel.create({ id: user.id, roleId: user.roleId })
    } catch (err) {
      throw new Error('CREATE: Failed to create a new user')
    }
  }

  async update(user: UserModel): Promise<UserModel> {
    try {
      const userToUpdate = await UserModel.findOne({
        where: {
          id: user.id,
        },
      })

      if (!userToUpdate) {
        throw new Error(`UPDATE: User with id ${user.id} was not found`)
      }

      userToUpdate.bestScore = user.bestScore
      return await userToUpdate.save()
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

  async getAll(
    limit?: number,
    offset?: number,
    orderCondition?: [string, string][],
    whereCondition?: [string, unknown][]
  ): Promise<UserModel[]> {
    const where = whereCondition && Object.fromEntries(whereCondition)

    try {
      return await UserModel.findAll({
        offset,
        limit,
        order: orderCondition,
        where,
      })
    } catch (err) {
      throw new Error(`GET: Failed to get all users`)
    }
  }

  async countPlayers(): Promise<number> {
    try {
      return await UserModel.count({
        where: {
          best_score: { [Op.ne]: null },
        },
      })
    } catch (err) {
      throw new Error(`GET: Failed to count players`)
    }
  }
}
