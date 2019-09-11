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
      tripType: joi.string().valid('One-way', 'Round-Trip', 'Multi-leg').required()
        .label('Please select a trip type'),
      purpose: joi.string().min(3).max(25).required()
        .label('Please enter a valid purpose \n the field must not be empty and it must be more than 3 letters'),
      origin: joi.string().min(3).max(25).required()
        .label('Please enter a valid source \n the field must not be empty and it must be more than 3 letters'),
      destination: joi.string().min(3).max(25).required()
        .label('Please enter a valid destination \n the field must not be empty and it must be more than 3 letters'),
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
