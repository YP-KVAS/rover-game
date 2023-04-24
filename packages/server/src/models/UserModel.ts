import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'
import { RoleModel } from './RoleModel'

@Table({ modelName: 'users', timestamps: false })
export class UserModel extends Model {
  @AllowNull(false)
  @ForeignKey(() => RoleModel)
  @Column({ type: DataType.INTEGER, field: 'role_id' })
  roleId: number

  @BelongsTo(() => RoleModel, 'role_id')
  role: RoleModel
}
