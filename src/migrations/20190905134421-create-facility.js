module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Facilities', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    state: {
      type: Sequelize.ENUM,
      values: [
        'Abia',
        'Adamawa',
        'Anambra',
        'Akwa Ibom',
        'Bauchi',
        'Bayelsa',
        'Benue',
        'Borno',
        'Cross River',
        'Delta',
        'Ebonyi',
        'Enugu',
        'Edo',
        'Ekiti',
        'Abuja',
        'Gombe',
        'Imo',
        'Jigawa',
        'Kaduna',
        'Kano',
        'Katsina',
        'Kebbi',
        'Kogi',
        'Kwara',
        'Lagos',
        'Nasarawa',
        'Niger',
        'Ogun',
        'Ondo',
        'Osun',
        'Oyo',
        'Plateau',
        'Rivers',
        'Sokoto',
        'Taraba',
        'Yobe',
        'Zamfara'
      ],
      allowNull: false
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    companyType: {
      type: Sequelize.ENUM,
      values: ['company', 'supplier'],
      allowNull: false
    },
    companyId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Companies',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    supplierId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Companies',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: false
    },
    addOns: {
      type: Sequelize.ARRAY(Sequelize.STRING)
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
  down: (queryInterface) => queryInterface.dropTable('Facilities')
};
