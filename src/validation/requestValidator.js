import baseJoi from '@hapi/joi';
import joiExtension from '@hapi/joi-date';

const Joi = baseJoi.extend(joiExtension);
const dateObj = new Date();
const month = dateObj.getMonth() + 1;
const today = dateObj.getDate();
const year = dateObj.getFullYear();

const newdate = `${year}-${month}-${today}`;

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
      statusId: Joi.valid([1, 2, 3, '1', '2', '3'])
        .label('Request statusId can only be values 1, 2, 3 - approved, pending, rejected'),
      requestId: Joi.number()
        .label('Request Id can only be a number'),
      purpose: Joi.string().min(7).max(100)
        .label('Purpose must be a string \n Must not be less than 7 and greater than 100 characters'),
      rememberMe: Joi.boolean()
        .label('RememberMe can only be boolean - True or false'),
      tripType: Joi.string()
        .label('tripType can only be of any of the three - One-way, Round-Trip, Multi-leg'),
      origin: Joi.string()
        .label('orign must be a string'),
      destination: Joi.string()
        .label('destination must be a string'),
      departureDate: Joi.date()
        .format('YYYY-MM-DD')
        .min(newdate)
        .label('Date format is YYYY-MM-DD \n Departure must be before or same with Return date'),
      returnDate: Joi.date()
        .format('YYYY-MM-DD')
        .min(Joi.ref('departureDate'))
        .label('Date format is YYYY-MM-DD \n Return date must be after or same with Departure date'),
    };
    const { error } = Joi.validate({ ...request }, schema);
    if (error) {
      throw error;
    }
    return true;
  }

  /**
   * Validates checkIn and checkOut keys
   * @param {string} key - The key to validate
   * @returns {Error} Returns a descriptive error message
   */
  static validateAccDate(key) {
    return (errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'any.required':
            err.message = `${key} is required!`;
            break;
          case 'date.format':
            err.message = `${key} should be in this format ${err.context.format}`;
            break;
          case 'date.base':
            err.message = `${key} should not be empty`;
            break;
          case 'date.min':
            err.message = `${key} must be after or same as  ${key === 'departureDate' ? "today's date" : 'departureDate'}`;
            break;
          default:
            break;
        }
      });
      return errors;
    };
  }
}
