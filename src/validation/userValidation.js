import joi from '@hapi/joi';
import passwordComplexity from 'joi-password-complexity';
import { Helpers } from '../utils';

const {
  successResponse, errorResponse
} = Helpers;

// password complexity object
const complexityOptions = {
  min: 8,
  max: 250,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 3,
};

// TODO: create userValidation class
/**
   * This class holds all methods used for user validation
   * Functions:
   * 1) signup - validates user upon registration.
   * 2) dummy - a dummy method for testing validations upon success.
   */
export default class userValidation {
  /**
     * Validates user paramenters upon registration
     *
     * @param {object} userObject - The user object
     * @param {object} res - The user response object
     * @returns {object} - returns an object (error or response).
     */
  static async signup(userObject) {
    // joi parameters to test against user inputs
    const schema = {
      firstName: joi.string().min(3).max(25).required()
        .label('Please enter a valid firstname \n the field must not be empty and it must be more than 2 letters'),
      lastName: joi.string().min(3).max(25).required()
        .label('Please enter a valid lastname \n the field must not be empty and it must be more than 2 letters'),
      email: joi.string().email().required()
        .label('Please enter a valid company email address'),
      password: new passwordComplexity(complexityOptions).required()
        .label('Password is required. \n It should be more than 8 characters, and should include at least a capital letter, and a number'),
      gender: joi.string().valid('male', 'female').required()
        .label('please input a gender (male or female'),
      street: joi.string().min(2).max(20).required()
        .label('Please input a street name'),
      city: joi.string().min(3).max(25).required()
        .label('Please input a city name'),
      state: joi.string().min(3).max(25).required()
        .label('Please input a state name'),
      country: joi.string().min(3).max(50).required()
        .label('Please input a country'),
      birthdate: joi.date().iso().required()
        .label('Please input a valid date format: yy-mm-dd'),
      phoneNumber: joi.string().regex(/^[0-9+\(\)#\.\s\/ext-]+$/).required()
        .label('Please input a valid phone number'),
      companyName: joi.string().min(3).max(40).required()
        .label('Please add your company name'),
    };
    // Once user inputs are validated, move into server
    const { error } = joi.validate({ ...userObject }, schema);
    if (error) {
      // throw errorResponse(res, { code: 400, message: error.details[0].context.label });
      throw error;
    }
    return true;
  }

  /**
     * Validates user paramenters upon registration
     *
     * @param {object} userObject - The user object
     * @param {object} res - The user response object
     * @returns {object} - returns an object (error or response).
     */
  static async companySignup(userObject) {
    // joi parameters to test against user inputs
    const schema = {
      email: joi.string().email().required()
        .label('Please enter a valid company email address'),
      password: new passwordComplexity(complexityOptions).required()
        .label('Password is required. \n It should be more than 8 characters, and should include at least a capital letter, and a number'),
      firstName: joi.string().min(3).max(25).required()
        .label('Please enter a valid firstname \n the field must not be empty and it must be more than 2 letters'),
      lastName: joi.string().min(3).max(25).required()
        .label('Please enter a valid lastname \n the field must not be empty and it must be more than 2 letters'),
      companyName: joi.string().min(3).max(40).required()
        .label('Please add your company name'),
      companySizeId: joi.number().integer().positive().required()
        .label('please select a company size'),
      companyPlanId: joi.number().integer().positive()
        .required()
        .label('please select a plan (1:silver, 2:gold or 3:platinum'),
      companyAddress: joi.string().min(10).max(60).regex(/^[\w',-\\/.\s]*$/)
        .required()
        .label('Please enter a valid address that is within 10 to 60 letters long'),
    };
    // Once user inputs are validated, move into server
    const { error } = joi.validate({ ...userObject }, schema);
    if (error) {
      throw error;
    }
    return true;
  }

  /**
     * Validates user paramenters upon registration
     *
     * @param {object} userObject - The user object
     * @param {object} res - The user response object
     * @returns {object} - returns an object (error or response).
     */
  static async userLogin(userObject) {
    // joi parameters to test against user inputs
    const schema = {
      email: joi.string().email().required()
        .label('Please enter a valid company email address'),
      password: new passwordComplexity(complexityOptions).required()
        .label('Password is required. \n It should be more than 8 characters, and should include at least a capital letter, and a number'),
    };
    // Once user inputs are validated, move into server
    const { error } = joi.validate({ ...userObject }, schema);
    if (error) {
      throw error;
    }
    return true;
  }

  /**
   *  Dummy callback function for validation tests
   * Use this function as a placeholder for controllers
   * during testing of validations whenever the controller
   * being validated for is not yet implemented
   *
   * e.g: @ route:-
   * userRouter.post('/auth/signup', userValidation.signup, userValidation.dummy);
   * @param {object} req request from endpoint
   * @param {object} res - response of method
   * @return {object} - returns an object
   */
  static dummy(req, res) {
    try {
      // outdated response values, dummy parameter used for testing only
      successResponse(res, 'Success', 200);
    } catch (error) {
      const status = error.status || 500;
      errorResponse(res, { code: status, message: error.message });
    }
  }
}
