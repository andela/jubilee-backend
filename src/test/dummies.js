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
  gender: 'male',
  lineManager: 'Jude',
  passportNo: 'Ae760bk',
  email: faker.internet.email(),
  companyName: 'Andela',
  password: 'Exunemployed01'
};
export const newRequest = {
  nameAsOnPassport: 'Daniel Smith',
  gender: 'male',
  requesterId: 12,
  purpose: 'Business Meeting',
  rememberMe: true,
  tripType: 'One-way',
  managerId: '14',
  origin: 'Lagos',
  destination: 'Abuja',
  departureDate: '2019-11-07',
  returnDate: '2019-11-21',
};

export const tripRequest = {
  nameAsOnPassport: 'Daniel Smith',
  gender: 'male',
  purpose: 'Official',
  tripType: 'One-way',
  origin: 'Abuja',
  destination: 'Lagos',
  departureDate: '2020-11-07',
  managerId: '14'
};

export const returnTripRequest = {
  nameAsOnPassport: 'Daniel Smith',
  gender: 'male',
  purpose: 'Official',
  tripType: 'Round-Trip',
  origin: 'Abuja',
  destination: 'Lagos',
  departureDate: '2020-11-07',
  returnDate: '2020-11-07',
  managerId: '14'
};

export const commentData = {
  message: 'I am thinking the trip may not be neccessary as the CEO would need you to get him some pounded yam over the weekend'
};


export const mockResponse = {
  status() {
    return this;
  },
  cookie() {
    return this;
  },
  json(obj) {
    return obj;
  }
};
