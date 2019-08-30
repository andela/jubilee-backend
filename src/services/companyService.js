import db from '../models';

const { Company, User, sequelize } = db;
/**
 * CompanyService class, interface for CompanyModel
 */
export default class CompanyService {
  /**
   * Saves user in the database
   * @static
   * @param {object} company - The user to be saved in the database.
   * @param {object} user - The user to be saved in the database.
   * @returns {Promise<object>} A promise object with user detail.
   * @memberof CompanyService
   */
  static async createCompany(company, user) {
    try {
      const result = await sequelize.transaction(async (t) => {
        const { dataValues: companyRecord } = await Company.create(company, { transaction: t });
        user.companyId = companyRecord.id;
        const { dataValues: userRecord } = await User.create(user, { transaction: t });
        return [companyRecord, userRecord];
      });
      return result;
    } catch (err) {
      return new Error('failed to create company');
    }
  }
}
