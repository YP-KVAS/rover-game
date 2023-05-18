import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript'
import { UserModel } from './UserModel'
import { RolesEnum } from '../utils/types/api'

@Table({ modelName: 'roles', timestamps: false })
export class RoleModel extends Model {
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  name: RolesEnum

  @HasMany(() => UserModel, 'role_id')
  userModels: UserModel[]
}
