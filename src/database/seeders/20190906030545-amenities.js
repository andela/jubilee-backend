
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Amenities', [
    {
      label: 'Sport center',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Conference room',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Gym',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Restaurant',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Beauty shop/Spa',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Pool',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Bar',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Ameniteis', null, {})

};
