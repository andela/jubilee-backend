
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('CompanySizes', [
    {
      label: '1-10',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: '11-50',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: '51-100',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: '101-above',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('CompanySizes', null, {})

};
