"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Supplier
} = _models.default;
/**
 * SupplierService class
 */

class SupplierService {
  /**
   * Adds supplier to the database
   * @static
   * @param {object} supplier - The supplier to be added to the database.
   * @returns {Promise<object>} A promise object with user detail.
   * @memberof SupplierService
   */
  static async create(supplier) {
    const {
      dataValues: newSupplier
    } = await Supplier.create(supplier);
    return newSupplier;
  }
  /**
   * Updates supplier data in the database
   * @static
   * @param {object} supplierData - The supplier to be added to the database.
   * @param {id} id - The id of the row to be updated.
   * @returns {Promise<object>} A promise object with user detail.
   * @memberof SupplierService
   */


  static async update(supplierData, id) {
    const [rowaffected, [newSupplier]] = await Supplier.update(supplierData, {
      returning: true,
      where: {
        id
      }
    });
    if (!rowaffected) throw new Error('Not Found');
    return newSupplier;
  }

}

exports.default = SupplierService;