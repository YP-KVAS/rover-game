import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'
import { UserModel } from './UserModel'
import { TopicModel } from './TopicModel'

@Table({ modelName: 'comments' })
export class CommentModel extends Model {
  @AllowNull(true)
  @Column(DataType.TEXT)
  message: string | null

  @AllowNull(true)
  @Column({ type: DataType.INTEGER, field: 'parent_comment_id' })
  parentCommentId: number

  @AllowNull(false)
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER, field: 'user_id' })
  userId: number

  @AllowNull(false)
  @ForeignKey(() => TopicModel)
  @Column({
    type: DataType.INTEGER,
    field: 'topic_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  topicId: number

  @BelongsTo(() => UserModel, 'user_id')
  user: UserModel

  @BelongsTo(() => TopicModel, 'topic_id')
  topic: TopicModel
}
