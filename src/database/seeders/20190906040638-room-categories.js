
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('RoomCategories', [
    {
      label: 'Single',
      description: 'A room assigned to one person. May have one or more beds.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Double',
      description: 'A room assigned to two people. May have one or more beds.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Triple',
      description: 'A room assigned to three people. May have two or more beds.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Quad',
      description: 'A room assigned to four people. May have two or more beds.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Queen',
      description: 'A room with a queen-sized bed. May be occupied by one or more people.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'King',
      description: 'A room with a king-sized bed. May be occupied by one or more people.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Twin',
      description: 'A room with two beds. May be occupied by one or more people.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Double-double',
      description: 'A room with two double (or perhaps queen) beds. May be occupied by one or more people.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Studio',
      description: 'A room with a studio bed – a couch that can be converted into a bed. May also have an additional bed.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Others',
      description: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('RoomCategories', null, {})

};
