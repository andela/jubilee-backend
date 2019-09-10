
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('RoleUsers', [{
    userId: 1,
    roleId: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 2,
    roleId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  ]),

  down: (queryInterface) => queryInterface.bulkDelete('RoleUsers', null, {})
};
