import joi from '@hapi/joi';
import { validationData } from '../utils';

/**
 * A collection of validation methods that checks data
 * entries for Facility as an entity on the App.
 *
 * @class FacilityValidator
 */
class FacilityValidator {
  /**
     * Validates a Facility upon creation
     *
     * @param {object} facility - The facility object to be validated.
     * @param {boolean} isCompany - True if its a company facility object
     * and false if its a supplier facility.
     * @returns {object | boolean } - returns an object (error response)
     * or a boolean if the facility details are valid.
     */
  static async validateFacility(facility, isCompany) {
    const roomSchema = isCompany ? {
      occupancyCount: joi.number().required()
        .label('Please fill in the max number of occupant for this category'),
      roomCount: joi.number().required()
        .label('Please fill in the number of rooms that are present for this category'),
      description: joi.string().min(3).max(250)
        .label('Please add a valid description'),
      roomCategoryId: joi.number().required()
        .label('Please select a category from the options provided'),
      newCategory: joi.string().min(3).max(10)
        .label('Please enter a meaningful and short category name')
    } : {
      occupancyCount: joi.number().required()
        .label('Please fill in the max number of occupant for this category'),
      roomCount: joi.number().required()
        .label('Please fill in the number of rooms that are present for this category'),
      description: joi.string().min(3).max(250)
        .label('Please add a valid description'),
      roomCategoryId: joi.number().required()
        .label('Please select a category from the options provided'),
      roomCost: joi.number().required()
        .label('Please fill in a cost for the room'),
      newCategory: joi.string().min(3).max(10)
        .label('Please enter a meaningful and short category name')
    };
    const schema = {
      name: joi.string().min(3).max(25).required()
        .label('Please enter a valid name for your facility, It should be atleast 3 characters long'),
      description: joi.string().min(3).max(250).required()
        .label('Please add a short description'),
      state: joi.valid(validationData.states).required()
        .label('Please select a state'),
      city: joi.string().min(3).max(25).required()
        .label('Please enter a valid city name'),
      address: joi.string().min(3).max(100).required()
        .label('Please fill in a valid Address'),
      imageUrl: joi.string().uri().required()
        .label('Please upload an Image of your facility'),
      amenities: joi.array().items(joi.number()).sparse()
        .label('Please check the given fields for your choice of amenities'),
      addOns: joi.array().items(joi.string()).sparse()
        .label('Please check the given fields for your choice of amenities'),
      rooms: joi.array().items(joi.object(roomSchema)).required()
        .label('Please create room categories for your facility')
    };
    const { error } = joi.validate({ ...facility }, schema);
    if (error) {
      throw error;
    }
    return true;
  }
}

export default FacilityValidator;
