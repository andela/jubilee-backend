'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    // Add altering commands here.
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkInsert('Users', [{
      firstName: 'Adebayo',
      lastName: 'Daramola',
      email: 'ade.steve@gmail.com',
      password: 'testing',
      phoneNo: 2347080,
      company: 'Andela',
      role: 'Senior Dev',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', [{
      email: 'ade.steve@gmail.com'
    }], {});
  }
};
