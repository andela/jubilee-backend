import baseJoi from '@hapi/joi';
import joiExtension from '@hapi/joi-date';
import { ApiError } from '../utils';

const Joi = baseJoi.extend(joiExtension);
const dateObj = new Date();
const month = dateObj.getMonth() + 1;
const today = dateObj.getDate();
const year = dateObj.getFullYear();

const newdate = `${year}-${month}-${today}`;

/**
   * This class holds all methods used for trip request validation
   * Functions:
   * 1) TripRequestValidation - validates user trip request.
   */
export default class TripRequestValidation {
  /**
       * Validates Trip Request paramenters
       *
       * @param {object} tripObject - The request object
       * @param {object} res - The request response object
       * @returns {object} - returns an object (error or response).
       */
  static async tripRequest(tripObject) {
    const schema = {
      managerId: Joi.number().required()
        .label('Manager Id is required \n Must be an integer'),
      requesterId: Joi.number()
        .label('Manager Id is required \n Must be an integer'),
      tripType: Joi.string()
        .valid('One-way', 'Round-Trip', 'Multi-leg')
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case 'any.required':
                err.message = 'tripType is required!';
                break;
              case 'any.empty':
                err.message = 'tripType should not be empty';
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      departureDate: Joi.date()
        .format('YYYY-MM-DD')
        .min(newdate)
        .required()
        .error(TripRequestValidation.validateTripDate('departureDate')),
      purpose: Joi.string()
        .min(3)
        .max(255)
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case 'any.required':
                err.message = 'purpose is required!';
                break;
              case 'string.min':
                err.message = 'purpose must not be less than 3 letters';
                break;
              case 'string.max':
                err.message = 'it must not exceed 255 letters';
                break;
              case 'any.empty':
                err.message = 'purpose should not be empty';
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      origin: Joi.string()
        .min(3)
        .max(25)
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case 'any.required':
                err.message = 'origin is required!';
                break;
              case 'string.min':
                err.message = 'origin must not be less than 3 letters';
                break;
              case 'string.max':
                err.message = 'it must not exceed 25 letters';
                break;
              case 'any.empty':
                err.message = 'origin should not be empty';
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      destination: Joi.string()
        .min(3)
        .max(25)
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case 'any.required':
                err.message = 'destination is required!';
                break;
              case 'string.min':
                err.message = 'destination must not be less than 3 letters';
                break;
              case 'string.max':
                err.message = 'destination must not exceed 25 letters';
                break;
              case 'any.empty':
                err.message = 'destination should not be empty';
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      managerId: Joi.number()
        .required().error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case 'any.required':
                err.message = 'managerId is required';
                break;
              case 'number.base':
                err.message = 'managerId must be a number';
                break;
              default:
                break;
            }
          });
          return errors;
        })
    };
    const { error } = Joi.validate({ ...tripObject }, schema);
    if (error) {
      throw new ApiError(400, error.details[0].message);
    }
    return true;
  }

  /**
   * Validates departureDate and returnDate keys
   * @param {string} key - The key to validate
   * @returns {Error} Returns a descriptive error message
   */
  static validateTripDate(key) {
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
            err.message = `${key} must be larger than or equal to ${key === 'departureDate' ? 'today' : 'departureDate'}`;
            break;
          default:
            break;
        }
      });
      return errors;
    };
  }
}
