import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript'
import { RoleModel } from './RoleModel'
import { TopicModel } from './TopicModel'
import { CommentModel } from './CommentModel'

@Table({ modelName: 'users' })
export class UserModel extends Model {
  @AllowNull(false)
  @ForeignKey(() => RoleModel)
  @Column({ type: DataType.INTEGER, field: 'role_id' })
  roleId: number

  @Column({ type: DataType.INTEGER, field: 'best_score' })
  bestScore: number | null

  @BelongsTo(() => RoleModel, 'role_id')
  role: RoleModel

  @HasMany(() => TopicModel, 'user_id')
  topicModels: TopicModel[]

  @HasMany(() => CommentModel, 'user_id')
  commentModels: CommentModel[]
}
