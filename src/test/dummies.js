import faker from 'faker';

export const newUser = {
  firstName: 'King',
  lastName: 'David',
  email: 'jubilee.barefootnomad@gmail.com',
  companyName: 'Andela',
  password: 'Elijahayodele12',
};

export const newSupplier = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  companyName: 'Andela',
  companyAddress: faker.address.secondaryAddress(),
  categoryOfServiceId: 2,
  password: faker.internet.password(15, false),
  phoneNumber: faker.phone.phoneNumber()
};

export const newFacility = {
  name: 'Sheraton Hotels',
  state: 'Lagos',
  city: 'Ajah',
  address: '123, St. Micheal str Ajah, Lagos state',
  imageUrl: 'https://cloudinary/sheraton-lagos',
  description: 'Hotels and suite',
  rooms: [{
    roomCount: 3,
    roomCategoryId: 4,
    occupancyCount: 2,
    roomCost: 5000
  },
  {
    roomCount: 2,
    roomCategoryId: 2,
    occupancyCount: 1,
    roomCost: 15000
  }],
  amenities: [1, 2, 3, 4],
  addOns: ['wifi', 'coffee shop']
};

export const newCompany = {
  firstName: 'Ago',
  lastName: 'Akin',
  email: 'daylay32@gmail.com',
  password: faker.internet.password(15, false),
  companyName: faker.company.companyName(),
  companyAddress: '20, Ania street, Ojomo',
  companySizeId: 2,
  companyPlanId: 3
};
