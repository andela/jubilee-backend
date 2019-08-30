"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var _config = _interopRequireDefault(require("../config/config"));

var _envConfig = _interopRequireDefault(require("../config/env-config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const basename = _path.default.basename(__filename);

const environ = _envConfig.default.NODE_ENV || 'development';
const config = _config.default[environ];
const db = {};
let sequelize;

if (config.prodDatabaseURI) {
  sequelize = new _sequelize.default(config.prodDatabaseURI, config);
}

if (environ === 'test') config.logging = false;
sequelize = new _sequelize.default(config.database, config.username, config.password, config);

_fs.default.readdirSync(__dirname).filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js').forEach(file => {
  const model = sequelize.import(_path.default.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = _sequelize.default;
var _default = db;
exports.default = _default;