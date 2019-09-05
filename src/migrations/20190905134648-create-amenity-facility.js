module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('AmenityFacilities', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    facilityId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        key: 'id',
        model: 'Facilities'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    amenityId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        key: 'id',
        model: 'Amenities'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
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
