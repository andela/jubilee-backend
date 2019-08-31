import FactoryBuilder from '../utils/factory';

const categoryOfServicesArray = [
  FactoryBuilder.categoryOfServices({
    categoryName: 'Accommodation services',
    categoryDescription: 'Provide hospitality services',
    createdAt: new Date(),
    updatedAt: new Date()
  }),
  FactoryBuilder.categoryOfServices({
    categoryName: 'Meet and greet services',
    categoryDescription: 'Provide meet and greet services',
    createdAt: new Date(),
    updatedAt: new Date()
  })
];


export default {
  up: (queryInterface) => queryInterface.bulkInsert('CategoryOfServices', categoryOfServicesArray, {}),

  down: (queryInterface) => queryInterface.bulkDelete('CategoryOfServices', null, {})
};
