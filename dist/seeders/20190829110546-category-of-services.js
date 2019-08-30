"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _factory = _interopRequireDefault(require("../utils/factory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const categoryOfServicesArray = [_factory.default.categoryOfServices({
  categoryName: 'Accommodation services',
  categoryDescription: 'Provide hospitality services',
  createdAt: new Date(),
  updatedAt: new Date()
}), _factory.default.categoryOfServices({
  categoryName: 'Meet and greet services',
  categoryDescription: 'Provide meet and greet services',
  createdAt: new Date(),
  updatedAt: new Date()
})];
var _default = {
  up: queryInterface => queryInterface.bulkInsert('CategoryOfServices', categoryOfServicesArray, {}),
  down: queryInterface => queryInterface.bulkDelete('CategoryOfServices', null, {})
};
exports.default = _default;