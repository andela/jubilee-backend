
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('CompanyPlans', [
    {
      label: 'Silver',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Gold',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Platinum',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('CompanyPlans', null, {})

};
