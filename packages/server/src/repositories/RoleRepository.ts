import { RoleModel } from '../models/RoleModel'

interface IRoleRepository {
  save(role: RoleModel): Promise<void>
  update(role: RoleModel): Promise<void>
  delete(roleId: number): Promise<void>
  getById(roleId: number): Promise<RoleModel>
  getByName(name: string): Promise<RoleModel | null>
}

export class RoleRepository implements IRoleRepository {
  async save(role: RoleModel): Promise<void> {
    try {
      await RoleModel.create({ name: role.name })
    } catch (err) {
      throw new Error('CREATE: Failed to create a new role')
    }
  }

  async update(role: RoleModel): Promise<void> {
    try {
      const roleToUpdate = await RoleModel.findOne({
        where: {
          id: role.id,
        },
      })

      if (!roleToUpdate) {
        throw new Error(`UPDATE: Role with id ${role.id} was not found`)
      }

      roleToUpdate.name = role.name
      await roleToUpdate.save()
    } catch (err) {
      throw new Error(`UPDATE: Failed to update role with id ${role.id}`)
    }
  }

  async delete(roleId: number): Promise<void> {
    try {
      const roleToDelete = await RoleModel.findOne({
        where: {
          id: roleId,
        },
      })

      if (!roleToDelete) {
        throw new Error(`DELETE: Role with id ${roleId} was not found`)
      }

      await roleToDelete.destroy()
    } catch (err) {
      throw new Error(`DELETE: Failed to delete role with id ${roleId}`)
    }
  }

  async getById(roleId: number): Promise<RoleModel> {
    try {
      const role = await RoleModel.findOne({
        where: {
          id: roleId,
        },
      })

      if (!role) {
        throw new Error(`GET: Role with id ${roleId} was not found`)
      }

      return role
    } catch (err) {
      throw new Error(`GET: Failed to get role by id ${roleId}`)
    }
  }

  async getByName(name: string): Promise<RoleModel | null> {
    try {
      const role = await RoleModel.findOne({
        where: {
          name,
        },
      })

      return role
    } catch (err) {
      throw new Error(`GET: Failed to get role by name ${name}`)
    }
  }
}
