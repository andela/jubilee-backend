module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [{
    firstName: 'Chisom',
    lastName: 'Ejim',
    email: 'ejimchisom@gmail.com',
    password: 'chisom04',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Efe',
    lastName: 'andela',
    email: 'efe@andela.com',
    createdAt: new Date(),
    updatedAt: new Date()
  }
  ]),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {})
};
