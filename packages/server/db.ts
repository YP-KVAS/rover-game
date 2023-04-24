import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { CategoryModel } from './src/models/CategoryModel'
import { UserModel } from './src/models/UserModel'
import { RoleModel } from './src/models/RoleModel'

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PORT,
} = process.env

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',

  models: [CategoryModel],
}

export const sequelize = new Sequelize(sequelizeOptions)

export async function dbConnect() {
  try {
    await sequelize.addModels([UserModel, CategoryModel, RoleModel])
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
