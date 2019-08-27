import helpers from './helpers';

/**
 * Model response for user detail
 */
export default class UserResponse {
  /**
   * Creates an instance of UserResponse
   *
   * @param {object} user - The user object to extract the properties from
   */
  constructor(user) {
    this.id = user.id;
    this.token = helpers.generateToken({ email: user.email });
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.gender = user.gender;
    this.street = user.street;
    this.city = user.city;
    this.state = user.state;
    this.country = user.country;
    this.bithdate = user.birthdate;
    this.phoneNumber = user.phoneNumber;
    this.companyName = user.companyName;
    this.isVerified = user.isVerified;
    this.role = user.role;
    this.department = user.department;
    this.lineManager = user.lineManager;
    this.preferredCurrency = user.preferredCurrency;
    this.preferredLanguage = user.preferredLanguage;
    this.googleId = user.googleId;
    this.facebookId = user.facebookId;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
