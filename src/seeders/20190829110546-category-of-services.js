export default {
  up: (queryInterface) => queryInterface.bulkInsert('CategoryOfServices', [
    {
      categoryName: 'Accommodation services',
      categoryDescription: 'Provide hospitality services',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      categoryName: 'Meet and greet services',
      categoryDescription: 'Provide meet and greet services',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('CategoryOfServices', null, {})
};
