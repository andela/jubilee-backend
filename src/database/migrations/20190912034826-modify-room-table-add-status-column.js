module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Rooms', 'roomStatus', {
    type: Sequelize.ENUM('available', 'unavailable'),
    allowNull: false,
    defaultValue: 'available'
  }),
  down: (queryInterface) => queryInterface.sequelize.query('ALTER TABLE \"Rooms\" DROP COLUMN \"roomStatus\"; DROP TYPE \"enum_Rooms_roomStatus\";')
};
