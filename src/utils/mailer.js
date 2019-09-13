import sendgrid from '@sendgrid/mail';
import env from '../config/env-config';

const { ADMIN_EMAIL, SENDGRID_KEY } = env;
sendgrid.setApiKey(SENDGRID_KEY);

/**
 * Contains methods for sending Emails
 *
 * @class Mailer
 */
class Mailer {
  /**
 * Sends an email to the user
 *
 * @param {object} options mail options
 * @param {string} options.email Recipient email address
 * @param {string} options.emailTemplateId Unique email template Id
 * @param {string} options.firstName Recipient firstName
 * @param {string} options.urlLink Link inside the mail
 * @param {string} options.companyToken Unique company token
 * @param {string} options.staffName Full staff name
 * @returns {Promise} Sendgrid response
 * @memberof Mailer
 */
  static async sendMail({
    email, emailTemplateId, firstName, urlLink, companyToken, staffName
  }) {
    const mail = {
      to: email,
      from: ADMIN_EMAIL,
      templateId: emailTemplateId,
      dynamic_template_data: {
        name: firstName,
        urlLink,
        token: companyToken,
        staffName
      }
    };
    try {
      await sendgrid.send(mail);
      return true;
    } catch (e) {
      return e.message;
    }
  }
}
export default Mailer;
