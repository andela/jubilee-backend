module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Statuses', [{
    label: 'Approved',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    label: 'Pending',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    label: 'Rejected',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Statuses', null, {})
};
