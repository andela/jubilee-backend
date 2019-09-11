import joi from '@hapi/joi';

/**
 * A collection of validation methods that checks data
 * entries for User Profile as an entity on the App.
 *
 * @class ProfileValidator
 */
export default class RequestValidator {
  /**
     * Validates a Facility upon creation
     *
     * @param {object} request - The user request object to be validated.
     * @returns {object | boolean } - returns an object (error response)
     * or a boolean if the user request details are valid.
     */
  static async validateRequestUpdate(request) {
    const schema = {
      status: joi.number().valid([1, 2, 3, '1', '2', '3']).required()
        .label('Request statusId is required can only be 1, 2, 3 - approved, pending, rejected'),
    };
    const { error } = joi.validate({ ...request }, schema);
    if (error) {
      throw error;
    }
    return true;
  }
}
