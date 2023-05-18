import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Index,
  Length,
  Model,
  Table,
} from 'sequelize-typescript'
import { CategoryModel } from './CategoryModel'
import { UserModel } from './UserModel'
import { CommentModel } from './CommentModel'

@Table({ modelName: 'topics' })
export class TopicModel extends Model {
  @AllowNull(false)
  @Index
  @Length({ min: 3, max: 120 })
  @Column(DataType.STRING)
  name: string

  @AllowNull(false)
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER, field: 'user_id' })
  userId: number

  @AllowNull(false)
  @ForeignKey(() => CategoryModel)
  @Column({
    type: DataType.INTEGER,
    field: 'category_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  categoryId: number

  @BelongsTo(() => CategoryModel, 'category_id')
  category: CategoryModel

  @BelongsTo(() => UserModel, 'user_id')
  user: UserModel

  @HasMany(() => CommentModel, 'topic_id')
  commentModels: CommentModel[]
}
