/* eslint-disable class-methods-use-this */
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
 * Collection of methods for BookingValidation
 * @class BookingValidation
 */
class BookingValidator {
  /**
   *
   * Validation methods for accomodation booking
   * @static
   * @param {object} bookingData - The booking to be validated.
   * @returns {object | boolean} Returns true if validation passes
   * or throws an error if validation fails.
   * @memberof BookingValidation
   */
  static validateAccommodation(bookingData) {
    const schema = {
      checkIn: Joi.date()
        .format('YYYY-MM-DD')
        .min(newdate)
        .required()
        .error(
          BookingValidator.validateAccDate('checkIn')
        ),
      checkOut: Joi.date()
        .format('YYYY-MM-DD')
        .min(Joi.ref('checkIn'))
        .required()
        .error(
          BookingValidator.validateAccDate('chekOut')
        ),
      userId: Joi.number()
        .positive()
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case 'any.required':
                err.message = 'userId is required!';
                break;
              case 'number.base':
                err.message = 'userId should not be empty';
                break;
              case 'number.positive':
                err.message = 'userId must be a positive number';
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      roomId: Joi.number()
        .positive()
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case 'any.required':
                err.message = 'roomId is required!';
                break;
              case 'number.base':
                err.message = 'roomId should not be empty';
                break;
              case 'number.positive':
                err.message = 'roomId must be a positive number';
                break;
              default:
                break;
            }
          });
          return errors;
        })
    };

    const { error } = Joi.validate({ ...bookingData }, schema);
    if (error) {
      throw new ApiError(400, error.details[0].message);
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
            err.message = `${key} must be larger than or equal to ${key === 'checkIn' ? 'today' : 'checkIn'}`;
            break;
          default:
            break;
        }
      });
      return errors;
    };
  }
}

export default BookingValidator;
