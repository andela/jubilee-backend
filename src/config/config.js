// import dotenv from 'dotenv';
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  production: {
    prodDatabaseURI: process.env.DATABASE_URL
  },

  development: {
    username: process.env.DB_USERNAME_DEV,
    password: process.env.DB_PASSWORD_DEV,
    database: process.env.DATABASE_DEV,
    host: process.env.DATABASE_URL_DEV,
    port: process.env.PORT || 5432,
    dialect: 'postgres'
  },

  test: {
    username: process.env.DB_USERNAME_TEST,
    password: process.env.DB_PASSWORD_TEST,
    database: process.env.DB_DATABASE_TES,
    host: process.env.DATABASE_URL_TEST,
    port: process.env.PORT || 5432,
    dialect: 'postgres'
  }
};
