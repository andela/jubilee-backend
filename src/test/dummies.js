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
