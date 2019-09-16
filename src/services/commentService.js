import db from '../models';
import { ApiError } from '../utils';

const { Comment, sequelize } = db;

/**
 *  A collection of methods that serves as an interface for the CommentModel.
 * @class CommentService
 */
export default class CommentService {
  /**
   * Fetches a comment instance based on it's primary key.
   * @static
   * @param {integer} commentId - Primary key of the comment to be fetched.
   * @param {object} options - Additional query information
   * @returns {Promise<array>} - An instance of comment table including it's relationships.
   * @memberof FacilityService
   */
  static async findCommentById(commentId, options = {}) {
    return Comment.findByPk(commentId, options);
  }


  /**
   * Creates a comment record in the database.
   * @static
   * @param {object} commentData - comment data to be recorded in the database.
   * @returns {Promise<object>} - A promise object which resolves to the newly created comment.
   * @memberof CommentService
   */
  static async createComment(commentData) {
    try {
      const result = await sequelize.transaction(async () => {
        const { id } = await Comment.create(commentData);
        const options = { include: ['author'] };
        const { dataValues: comment } = await CommentService.findCommentById(id, options);
        return {
          ...comment,
          author: `${comment.author.firstName} ${comment.author.lastName}`
        };
      });
      return result;
    } catch (err) {
      throw new ApiError(500, 'comment was not created');
    }
  }

  /**
   * Deletes a comment record from the database.
   * @static
   * @param {number} commentId - id of comment to be deleted from the database.
   * @returns {Promise<object>} - A promise object which resolves to the newly created comment.
   * @memberof CommentService
   */
  static async deleteCommentById(commentId) {
    return Comment.destroy({ where: { id: commentId } });
  }
}
