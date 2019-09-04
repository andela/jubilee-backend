import baseJoi from '@hapi/joi';
import joiExtension from '@hapi/joi-date';
import { ApiError } from '../utils';

const Joi = baseJoi.extend(joiExtension);
const dateObj = new Date();
const month = dateObj.getMonth() + 1;
const today = dateObj.getDate();
const year = dateObj.getFullYear();

const tomorrow = dateObj.getDate() + 1;

const newdate = `${year}-${month}-${today}`;
const newDay = `${year}-${month}-${tomorrow}`;

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
   * @returns {object | boolean} Returns true if validation passes or throws an error if validation fails.
   * @memberof BookingValidation
   */
  static validateAccommodation(bookingData) {
    const schema = {
      fullname: Joi.string()
        .min(5)
        .max(50)
        .required()
        .error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case 'any.required':
                err.message = 'fullname is required!';
                break;
              case 'any.empty':
                err.message = 'fullname should not be empty!';
                break;
              case 'string.min':
                err.message = `fullname should be at least ${err.context.limit} characters!`;
                break;
              case 'string.max':
                err.message = `fullname should be at most ${err.context.limit} characters!`;
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      checkIn: Joi.date()
        .format('YYYY-MM-DD')
        .min(newdate)
        .required()
        .error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case 'any.required':
                err.message = 'checkIn is required!';
                break;
              case 'date.format':
                err.message = `checkIn should be in this format ${err.context.format}`;
                break;
              case 'date.base':
                err.message = 'checkin should not be empty';
                break;
              case 'date.min':
                err.message = 'checkin must be larger than or equal to today';
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      checkOut: Joi.date()
        .format('YYYY-MM-DD')
        .min(newDay)
        .required()
        .error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case 'any.required':
                err.message = 'checkOut is required!';
                break;
              case 'date.format':
                err.message = `checkOut should be in this format ${err.context.format}`;
                break;
              case 'date.base':
                err.message = 'checkOut should not be empty';
                break;
              case 'date.min':
                err.message = `checkOut must be larger than or equal to ${newDay}`;
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
      console.log(error.details[0]);
      throw new ApiError(400, error.details[0].message);
    }
    return true;
  }
}

export default BookingValidator;
