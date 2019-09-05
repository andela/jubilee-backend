/**
 * utility for user permissions check
 */
export default class permissionsId {
  /**
       * method for permission id assignment
       * @param {object} req - The request from the endpoint.
       * @param {object} res - The response returned by the method.
       * @param {object} next - the returned values going into the next operation.
       * @returns {object} - returns an object (error or response).
       */
  static one(req, res, next) {
    req.body.permissionId = 1;
    next();
  }

  /**
       * method for permission id assignment
       * @param {object} req - The request from the endpoint.
       * @param {object} res - The response returned by the method.
       * @param {object} next - the returned values going into the next operation.
       * @returns {object} - returns an object (error or response).
       */
  static two(req, res, next) {
    req.body.permissionId = 2;
    next();
  }

  /**
       * method for permission id assignment
       * @param {object} req - The request from the endpoint.
       * @param {object} res - The response returned by the method.
       * @param {object} next - the returned values going into the next operation.
       * @returns {object} - returns an object (error or response).
       */
  static three(req, res, next) {
    req.body.permissionId = 3;
    next();
  }

  /**
       * method for permission id assignment
       * @param {object} req - The request from the endpoint.
       * @param {object} res - The response returned by the method.
       * @param {object} next - the returned values going into the next operation.
       * @returns {object} - returns an object (error or response).
       */
  static four(req, res, next) {
    req.body.permissionId = 4;
    next();
  }

  /**
       * method for permission id ssignment
       * @param {object} req - The request from the endpoint.
       * @param {object} res - The response returned by the method.
       * @param {object} next - the returned values going into the next operation.
       * @returns {object} - returns an object (error or response).
       */
  static five(req, res, next) {
    req.body.permissionId = 5;
    next();
  }

  /**
   * method for permission id assignment
   * @param {object} req - The request from the endpoint.
   * @param {object} res - The response returned by the method.
   * @param {object} next - the returned values going into the next operation.
   * @returns {object} - returns an object (error or response).
   */
  static six(req, res, next) {
    req.body.permissionId = 6;
    next();
  }

  /**
       * method for permission id assignment
       * @param {object} req - The request from the endpoint.
       * @param {object} res - The response returned by the method.
       * @param {object} next - the returned values going into the next operation.
       * @returns {object} - returns an object (error or response).
       */
  static seven(req, res, next) {
    req.body.permissionId = 7;
    next();
  }

  /**
       * method for permission id assignment
       * @param {object} req - The request from the endpoint.
       * @param {object} res - The response from the endpoint.
       * @param {object} next - the returned values going into the next operation.
       * @returns {object} - returns an object (error or response).
       */
  static eight(req, res, next) {
    req.body.permissionId = 8;
    next();
  }
}
