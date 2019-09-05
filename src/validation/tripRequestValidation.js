import joi from '@hapi/joi';

const newDate = new Date();

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
      purpose: joi.string().min(3).max(25).required()
        .label('Please enter a valid purpose \n the field must not be empty and it must be more than 2 letters'),
      source: joi.string().min(3).max(25).required()
        .label('Please enter a valid source \n the field must not be empty and it must be more than 2 letters'),
      destination: joi.string().min(3).max(25).required()
        .label('Please enter a valid destination \n the field must not be empty and it must be more than 2 letters'),
      accBookingId: joi.number().required()
        .label('Please enter a valid accBookingId \n the field must not be empty'),
      ManagerId: joi.number().required()
        .label('Please enter a valid ManagerId \n the field must not be empty'),
      departureDate: joi.date().iso().required().min(newDate)
        .label('Please input a valid date format: yy-mm-dd')
    };
    const { error } = joi.validate({ ...tripObject }, schema);
    if (error) {
      throw error;
    }
    return true;
  }
}
