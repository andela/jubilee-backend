import joi from '@hapi/joi';
import passwordComplexity from 'joi-password-complexity';
import response from '../utils';

// password complexity object
const complexityOPtions = {
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
     * @param {object} req - The request from the endpoint.
     * @param {object} res - The response returned by the method.
     * @param {object} next - the returned values going into the next operation.
     * @returns {object} - returns an object (error or response).
     */
  static signup(req, res, next) {
    const schema = {
      firstName: joi.string().min(3).max(15).required()
        .label('first name is too short'),
      lastName: joi.string().min(3).max(15).required()
        .label('last name is too short'),
      email: joi.string().email().required()
        .label('invalid email format'),
      password: new passwordComplexity(complexityOPtions).required()
        .label('invalid password format'),
      gender: joi.string().valid('male', 'female').required()
        .label('please input gender'),
      city: joi.string().min(5).max(20).required()
        .label('please input a city'),
      country: joi.string().min(5).max(15).required()
        .label('please input a country'),
      birthdate: joi.date().iso().required()
        .label('please input a valid date format'),
      phoneNumber: joi.string().min(11).max(11).required()
        .label('phone number must be 11 digits'),
      companyName: joi.string().min(3).max(15).required()
        .label('please add your company name'),
    };
    const { error } = joi.validate({ ...req.body }, schema);
    if (!error) next();
    else {
      response(res, error.details[0].context.label, 400);
    }
  }

  /**
   *  Dummy callback function for validation tests
   * @param {object} req request from endpoint
   * @param {object} res - response of method
   * @return {object} - returns an object
   */
  static dummy(req, res) {
    try {
      response(res, 'success', 200);
    } catch (error) {
      response(res, error, 500);
    }
  }
}
