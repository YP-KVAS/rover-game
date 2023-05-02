import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { CategoryModel } from './src/models/CategoryModel'
import { UserModel } from './src/models/UserModel'
import { RoleModel } from './src/models/RoleModel'
import { TopicModel } from './src/models/TopicModel'
import { CommentModel } from './src/models/CommentModel'
import type { Dialect } from 'sequelize'

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PORT,
  DIALECT,
} = process.env

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: DIALECT as Dialect,

  models: [UserModel, CategoryModel, RoleModel, TopicModel, CommentModel],
}

export const sequelize = new Sequelize(sequelizeOptions)

export async function dbConnect() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
