import joi from '@hapi/joi';
import passwordComplexity from 'joi-password-complexity';
import { response, ApiResponse } from '../utils';
import UserService from '../services/index';

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
  static async signup(req, res, next) {
    // joi parameters to test against user inputs
    const schema = {
      firstName: joi.string().min(3).max(25).required()
        .label('first name is too short'),
      lastName: joi.string().min(3).max(25).required()
        .label('last name is too short'),
      email: joi.string().email().required()
        .label('invalid email format'),
      password: new passwordComplexity(complexityOPtions).required()
        .label('invalid password format'),
      gender: joi.string().valid('male', 'female').required()
        .label('please input gender'),
      street: joi.string().min(5).max(20).required()
        .label('please input a street'),
      city: joi.string().min(3).max(25).required()
        .label('please input a city'),
      state: joi.string().min(3).max(25).required()
        .label('please input a state'),
      country: joi.string().min(3).max(50).required()
        .label('please input a country'),
      birthdate: joi.date().iso().required()
        .label('please input a valid date format'),
      phoneNumber: joi.string().regex(/^[0-9+\(\)#\.\s\/ext-]+$/).required()
        .label('phone number must be 11 digits'),
      companyName: joi.string().min(3).max(40).required()
        .label('please add your company name'),
    };
    // Once user inputs are validated, move into server
    const { error } = joi.validate({ ...req.body }, schema);
    if (error) {
      res.status(400).json(new ApiResponse(false, 400, error.details[0].context.label));
    } else {
      // check if user exists in database
      const user = await UserService.find(req.body.email);
      if (!user) {
        next();
      } else {
        res.status(409).json(new ApiResponse(false, 409, `User with email: "${req.body.email}" already exists`));
      }
    }
  }

  /**
   *  Dummy callback function for validation tests
   * Use this function as a placeholder for controllers
   * during testing of validations whenever the controller
   * being validated for is not yet implemented
   *
   * e.g: @ route:-
   * serRouter.post('/auth/signup', userValidation.signup, userValidation.dummy);
   * @param {object} req request from endpoint
   * @param {object} res - response of method
   * @return {object} - returns an object
   */
  static dummy(req, res) {
    try {
      // outdated response values, dummy parameter used for testing only
      response(res, 'success', 200);
    } catch (error) {
      response(res, error, 500);
    }
  }
}
