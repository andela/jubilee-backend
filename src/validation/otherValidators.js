import joi from '@hapi/joi';
/**
 * A collection of validation methods that checks data
 * entries for any entity of the App.
 *
 * @class OtherValidators
 */
export default class OtherValidators {
  /**
     * Validates a Comment upon creation
     *
     * @param {object}comment - The comment to be validated.
     * @returns {object | boolean } - returns an object (error response)
     * or a boolean if the comment is valid.
     * @memberof OtherValidators
     */
  static commentValidator(comment) {
    const commentSchema = {
      message: joi.string().required().max(1500)
        .label('Please enter a valid comment and ensure it is not more than 1500 characters long'),
      requestId: joi.number().required()
        .label('Please enter a valid requestId')
    };
    const { error } = joi.validate({ ...comment }, commentSchema);
    if (error) {
      throw error;
    }
    return true;
  }
}
