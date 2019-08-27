import { helpers } from '../utils';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Adebayo',
      lastName: 'Daramola',
      birthdate: '1986-09-21',
      preferredLanguage: 'EN',
      preferredCurrency: 'Naira',
      email: 'ade.steve@gmail.com',
      gender: 'Male',
      street: 'Backstreet',
      city: 'Ilupeju',
      state: 'Lagos',
      country: 'Nigeria',
      zip: '100001',
      phoneNo: '2347080445678',
      companyName: 'Andela',
      password: helpers.hash('testing'),
      company: 'Andela',
      role: 'Senior',
      isVerified: false,
      facebookId: 'Nil',
      googleId: 'Nil',
      department: 'admin',
      lineManager: 'Lati',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('Users', [{
      email: 'ade.steve@gmail.com'
    }], {});
  }
};
