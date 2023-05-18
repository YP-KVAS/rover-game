import {
  DataType,
  Model,
  Table,
  Column,
  AllowNull,
  Length,
  Default,
  HasMany,
} from 'sequelize-typescript'
import { TopicModel } from './TopicModel'

@Table({ modelName: 'categories' })
export class CategoryModel extends Model {
  @AllowNull(false)
  @Length({ min: 3, max: 120 })
  @Column(DataType.STRING)
  name: string

  @AllowNull(false)
  @Default(0)
  @Column({ type: DataType.INTEGER, field: 'topic_count' })
  topicCount: number

  @HasMany(() => TopicModel, 'category_id')
  topicModels: TopicModel[]
}
