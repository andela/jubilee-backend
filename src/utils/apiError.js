/**
 * Error class for Barefoot Nomad
 * @extends Error
 */
export default class ApiError extends Error {
  /**
   * Create an instance of ApiError
   *
   * @param {number} status - The status code of the error
   * @param {string} message - The error message
   */
  constructor(status, message) {
    super();

    this.status = status;
    this.message = message;
  }
}
