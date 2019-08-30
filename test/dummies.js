import faker from 'faker';

export const newUser = {
  firstName: 'King',
  lastName: 'David',
  email: 'jubilee.barefootnomad@gmail.com',
  country: 'Nigeria',
  companyName: 'Andela',
  password: 'Elijahayodele12',
  gender: 'male',
  street: '20, Board Street',
  city: 'ikeja',
  state: 'Lagos',
  birthdate: faker.date.past(),
  phoneNumber: '08063345598'
};

export const newSupplier = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  companyName: faker.company.companyName(),
  companyAddress: faker.address.secondaryAddress(),
  categoryOfServiceId: 2,
  password: faker.internet.password(15, false),
  phoneNumber: faker.phone.phoneNumber()
};
export const newCompany = {
  firstName: 'Ago',
  lastName: 'Akin',
  email: 'daylay6@gmail.com',
  password: faker.internet.password(15, false),
  companyName: faker.company.companyName(),
  companyAddress: '20, Ania street, Ojomo',
  companySizeId: 2,
  companyPlanId: 3
};

export const obj = {};
