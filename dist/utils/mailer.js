"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mail = _interopRequireDefault(require("@sendgrid/mail"));

var _envConfig = _interopRequireDefault(require("../config/env-config"));

var _helpers = _interopRequireDefault(require("./helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  ADMIN_EMAIL,
  SENDGRID_KEY
} = _envConfig.default;

_mail.default.setApiKey(SENDGRID_KEY);
/**
 * Contains methods for sending Emails
 *
 * @class Mailer
 */


class Mailer {
  /**
   * Sends an account verification link to a user's email
   * @param {Request} req - Request object.
   * @param {object} options - Mail options.
   * @param {string} options.email - Recipient email address.
   * @param {string} options.firstName - Recipient firstName.
   * @returns {Promise<boolean>} - Resolves as true if mail was successfully sent
   * or false if otherwise.
   * @memberof Mailer
   */
  static async sendVerificationEmail(req, {
    id,
    email,
    firstName,
    role
  }) {
    const verificationLink = _helpers.default.generateVerificationLink(req, {
      id,
      email,
      role
    });

    const mail = {
      to: email,
      from: ADMIN_EMAIL,
      templateId: 'd-a1922b184048430088fd7d0bf446cd06',
      dynamic_template_data: {
        name: firstName,
        'verification-link': verificationLink
      }
    };

    try {
      await _mail.default.send(mail);
      return true;
    } catch (e) {
      return false;
    }
  }
  /**
  * Sends a password reset link to a user's email
  *
  * @param {object} options mail options
  * @param {string} options.email Recipient email address
  * @param {string} options.firstName Recipient firstName
  * @param {string} options.resetPasswordLink Password reset link
  * @returns {Promise} Sendgrid response
  * @memberof Mailer
  */


  static async sendResetMail({
    email,
    firstName,
    resetPasswordLink
  }) {
    const mail = {
      to: email,
      from: ADMIN_EMAIL,
      templateId: 'd-dd8d3babd4b842b28e3ebf03cfdc4c90',
      dynamic_template_data: {
        firstName,
        resetPasswordLink
      }
    };

    try {
      await _mail.default.send(mail);
      return true;
    } catch (e) {
      return e.message;
    }
  }

}

var _default = Mailer;
exports.default = _default;