module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Roles', [{
    label: 'companySuperAdmin',
    description: ' '
  },
  {
    label: 'companyTravelAdmin',
    description: ' '
  },
  {
    label: 'companyTravelTeamMember',
    description: ' '
  },
  {
    label: 'companyManager',
    description: ' '
  },
  {
    label: 'companyRequester',
    description: ' '
  },
  {
    label: 'supplierSuperAdmin',
    description: ' '
  },
  {
    label: 'supplierManager',
    description: ' '
  },
  {
    label: 'supplierTeamMenber',
    description: ' '
  },
  {
    label: 'unassigned',
    description: ' '
  }]),

  down: (queryInterface) => queryInterface.bulkDelete('Roles', null, {})
};
