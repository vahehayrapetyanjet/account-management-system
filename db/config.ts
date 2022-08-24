
import { Sequelize, Dialect } from 'sequelize'
import { env  } from '../config/env'

const dbName = env.DB_NAME as string
const dbUser = env.DB_USER as string
const dbHost = env.DB_HOST
const dbDriver = env.DB_DRIVER as Dialect
const dbPassword = env.DB_PASSWORD
const isDev = env.NODE_ENV === 'development'

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
  logging: isDev
});

export default sequelizeConnection