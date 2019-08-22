/**
 * Response class for Barefoot Nomad
 */
export default class ApiResponse {
  /**
   * Create an instance of ApiResponse
   *
   * @param {boolean} success - Sets the type of response.
   * Returns a success response if true else returns an error response
   * @param {number} status - The status code of the response
   * @param {object} data - The response data
   */
  constructor(success, status, data) {
    this.status = status;
    if (success) {
      this.data = data;
    } else {
      this.message = data;
    }
  }
}
