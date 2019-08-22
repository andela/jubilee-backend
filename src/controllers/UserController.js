import { UserService } from '../services';

const { userLogin } = UserService;

/**
 * @description A class of all user controllers
 */
export default class UserController {
  /**
   * 
   * @param {object} req request object
   * @param {object} res reponse object
   * @returns {object} JSON response
   */
  static async loginUser(req, res) {
    try {
      return await userLogin(req.body, res);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Internal Server Error'
      });
    }
  }
}
