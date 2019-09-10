module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('requests', [{
    requesterId: 1,
    managerId: 2,
    accBookingId: 1,
    purpose: 'official',
    status: 'pending',
    tripType: 'one-way',
    origin: 'lagos',
    destination: 'abujah',
    departureDate: new Date(),
    returnDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    requesterId: 1,
    managerId: 2,
    accBookingId: 1,
    purpose: 'official',
    status: 'approved',
    tripType: 'round-trip',
    origin: 'lagos',
    destination: 'abujah',
    departureDate: new Date(),
    returnDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    requesterId: 1,
    managerId: 2,
    accBookingId: 1,
    purpose: 'official',
    status: 'rejected',
    tripType: 'multi-leg',
    origin: 'lagos',
    destination: 'abujah',
    departureDate: new Date(),
    returnDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
  ]),

  down: (queryInterface) => queryInterface.bulkDelete('requests', null, {})
};
