
export default {
  up: (queryInterface) => queryInterface.bulkInsert('Amenities', [
    {
      label: 'Swimming Pool',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Restaurant',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Conference Room',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Casino',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Club House',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Sport Center',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Shopping Plaza',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Laundry',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Beauty shop/Spa',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Bar',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Amenities', null, {})
};
