module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('AmenityFacilities', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    amenityId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    facilityId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('AmenityFacilities')
};
