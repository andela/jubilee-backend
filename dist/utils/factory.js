"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rosie = require("rosie");

/**
 * FactoryBuilder class contains methods that defines the schema for generating seed data
 */
class FactoryBuilder {
  /**
   * Defines the schema for categoryOfservices with some defaults that can be overwritten
   * durring method calls
   * @param { obejct } data - Data obejct to overwrite schema defaults.
   * @returns { object } Category of service factory - This exposes the build command for building
   * out data based on the schema and data obeject provided
   */
  static categoryOfServices(data) {
    _rosie.Factory.define('categoryOfServices').attr('categoryName', 'categoryName').attr('categoryDescription', 'categoryDescription').attr('createdAt', new Date()).attr('updatedAt', new Date());

    return _rosie.Factory.build('categoryOfServices', data);
  }

}

var _default = FactoryBuilder;
exports.default = _default;