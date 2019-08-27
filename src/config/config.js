import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  production: {
    prodDatabaseURI: process.env.DATABASE_URL,
    dialect: 'postgres'
  },

  development: {
    username: process.env.DB_USERNAME_DEV,
    password: process.env.DB_PASSWORD_DEV,
    database: process.env.DATABASE_DEV,
    host: process.env.DATABASE_URL_DEV || '127.0.0.1',
    port: process.env.DB_PORT_DEV || 5432,
    dialect: 'postgres',
  },

  test: {
    username: process.env.DB_USERNAME_TEST,
    password: process.env.DB_PASSWORD_TEST,
    database: process.env.DATABASE_TEST,
    host: process.env.DATABASE_URL_TEST || '127.0.0.1',
    port: process.env.DB_PORT_TEST || 5432,
    dialect: 'postgres',
  }
};
