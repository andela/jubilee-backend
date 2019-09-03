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

  /**
   *
   * updates an existing company by ID
   * @static
   * @param {object} companyData user properties to be updated
    * @param {string} id user id
   * @returns {Promise<object | null | string> } an object containing the updated
   * properties of the user is returned on success
   * or a null value if update fails, and an error message if a user is not found
   * @memberof CompanyService
   */
  static async updateCompanyById(companyData, id) {
    const [rowaffected, [company]] = await Company.update(
      companyData,
      { returning: true, where: { id } }
    );
    if (!rowaffected) throw new Error('Not Found');
    return company;
  }
}
