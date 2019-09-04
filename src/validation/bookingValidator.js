import joi from '@hapi/joi';
import { ApiError } from '../utils';

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
      fullname: joi
        .string()
        .min(5)
        .max(50)
        .required()
        .error(errors => {
          errors.forEach(err => {
            switch (err.type) {
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
        })
    };

    const { error } = joi.validate({ ...bookingData }, schema);
    if (error) {
      throw new ApiError(400, error.details[0].context.label);
    }
    return true;
  }
}

export default BookingValidator;
