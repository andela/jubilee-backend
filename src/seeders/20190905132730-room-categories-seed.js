export default {
  up: (queryInterface) => queryInterface.bulkInsert('RoomCategories', [
    {
      label: 'Single',
      description: 'A room assigned to one person. It may have one or more beds.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Double',
      description: 'A room assigned to two people. It may have one or more beds.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Triple',
      description: 'A room assigned to three people. It may have two or more beds.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Quad',
      description: 'A room assigned to four people. It may have two or more beds.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Queen',
      description: 'A room with a queen-sized bed. It may be occupied by one or more people.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'King',
      description: 'A room with a king-sized bed. It may be occupied by one or more people.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Twin',
      description: 'A room with two beds. It may be occupied by one or more people.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Double-double',
      description: 'A room with two double (or perhaps queen) beds. It may be occupied by one or more people',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Studio',
      description: 'A room with a studio bed – a couch that can be converted into a bed. It may also have an additional bed.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      label: 'Others',
      description: 'Any other room category not listed.',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('RoomCategories', null, {})
};
