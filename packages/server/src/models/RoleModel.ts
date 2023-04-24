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
  @HasMany(() => UserModel, 'role_id')
  userModals: Array<UserModel>

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  name: RolesEnum
}
