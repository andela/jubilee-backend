module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('accommodationBookings', [{
    userId: 1,
    roomId: 1,
    checkIn: new Date(),
    checkOut: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  }]),

  down: (queryInterface) => queryInterface.bulkDelete('accommodationBookings', null, {})
};
