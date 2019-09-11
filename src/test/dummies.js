/* eslint-disable import/no-extraneous-dependencies */
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

export const createCompanyFacility = [
  {
    firstName: 'Ayodele',
    lastName: 'Akin',
    companySizeId: 1,
    companyPlanId: 2,
    email: 'daylay43@gmail.com',
    companyAddress: '30, Ania Street',
    companyName: 'Andela',
    password: 'Elijah38490'
  },
  {
    amenities: [
      1, 5, 5, 6, 7, 8
    ],
    rooms: [{
      occupancyCount: 2,
      roomCategoryId: 1,
      description: 'A room for a single dude',
      roomCount: 3
    },
    {
      occupancyCount: 3,
      roomCategoryId: 2,
      description: 'A room for two dudes',
      roomCount: 3
    }],
    description: 'A nice place to stay for all your ever',
    addOns: ['parking lot', 'free-wifi'],
    state: 'Ondo',
    city: 'Akure',
    address: '30, Ojumu Crescent',
    name: 'Bliss World',
    imageUrl: 'http://www.google.com'
  }

];
export const newCompanyUser = {
  firstName: 'Mike',
  lastName: 'Tyson',
  email: faker.internet.email(),
  companyName: 'Andela',
  password: 'Exunemployed01'
};
export const newRequest = {
  requesterId: 12,
  purpose: 'Business Meeting',
  rememberMe: true,
  tripType: 'One-way',
  origin: 'Lagos',
  destination: 'Abuja',
  departureDate: '2019-11-07',
  returnDate: '2019-11-21',
};
