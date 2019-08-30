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

export const newCompany = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(15, false),
  companyName: faker.company.companyName(),
  companyAddress: 'No 20, Ilupeju bus stop',
  sizeId: 2,
  planId: 3
}

export const obj = {};
