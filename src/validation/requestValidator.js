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
      statusId: joi.valid([1, 2, 3, '1', '2', '3'])
        .label('Request statusId can only be values 1, 2, 3 - approved, pending, rejected'),
      requestId: joi.number()
        .label('Request Id can only be a number'),
      purpose: joi.string().min(7).max(100)
        .label('Purpose must be a string \n Must not be less than 7 and greater than 100 characters'),
      rememberMe: joi.boolean()
        .label('RememberMe can only be boolean - True or false'),
      tripType: joi.string()
        .label('tripType can only be of any of the three - One-way, Round-Trip, Multi-leg'),
      origin: joi.string()
        .label('orign must be a string'),
      destination: joi.string()
        .label('destination must be a string'),
      departureDate: joi.date()
        .label('departureDate Can only be date'),
      returnDate: joi.date()
        .label('returnDate Can only be date'),
    };
    const { error } = joi.validate({ ...request }, schema);
    if (error) {
      throw error;
    }
    return true;
  }
}
