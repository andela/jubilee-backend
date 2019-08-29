import db from '../models';

const { Supplier } = db;

/**
 * SupplierService class
 */
export default class SupplierService {
  /**
   * Adds supplier to the database
   * @static
   * @param {object} supplier - The supplier to be added to the database.
   * @returns {Promise<object>} A promise object with user detail.
   * @memberof SupplierService
   */
  static async create(supplier) {
    const { dataValues: newSupplier } = await Supplier.create(supplier);
    return newSupplier;
  }
}
