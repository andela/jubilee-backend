import joi from '@hapi/joi';
import { validationData } from '../utils';

/**
 * A collection of validation methods that checks data
 * entries for User Profile as an entity on the App.
 *
 * @class ProfileValidator
 */
export default class ProfileValidator {
  /**
     * Validates a Facility upon creation
     *
     * @param {object} user - The user profile object to be validated.
     * @returns {object | boolean } - returns an object (error response)
     * or a boolean if the user profile details are valid.
     */
  static async validateProfile(user) {
    const schema = {
      firstName: joi.string().min(3).max(25)
        .label('Please enter a valid firstname \n the field must be more than 2 letters'),
      lastName: joi.string().min(3).max(25)
        .label('Please enter a valid lastname \n the field must be more than 2 letters'),
      email: joi.string().email()
        .label('Please enter a valid company email address'),
      phoneNumber: joi.string().regex(/^[0-9+\(\)#\.\s\/ext-]+$/)
        .label('Please input a valid phone number'),
      companyAddress: joi.string().min(3).max(40)
        .label('Please add your company address'),
      gender: joi.string().valid(['Male', 'Female', 'other', 'male', 'female', 'Other'])
        .label('Please enter a valid gender \n Male, Female, Other'),
      birthdate: joi.date().iso()
        .label('Please input a valid date format: yy-mm-dd'),
      street: joi.string()
        .label('Please enter a valid street'),
      city: joi.string()
        .label('Please enter a valid city'),
      state: joi.valid(validationData.states)
        .label('input valid state'),
    };
    const { error } = joi.validate({ ...user }, schema);
    if (error) {
      throw error;
    }
    return true;
  }
}
