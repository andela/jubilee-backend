import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import sequelizeConfig from '../config/config';
import env from '../config/env-config';

const basename = path.basename(__filename);
const environ = env.NODE_ENV || 'development';
const config = sequelizeConfig[environ];
const db = {};
let sequelize;
if (config.prodDatabaseURI) {
  sequelize = new Sequelize(config.prodDatabaseURI, config);
}

sequelize = new Sequelize(config.database, config.username, config.password, config);


fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
