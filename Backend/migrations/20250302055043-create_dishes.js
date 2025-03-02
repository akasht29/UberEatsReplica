'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Dishes', {
      dish_id: { 
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
      },
      restaurant_id: { 
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: { model: 'Restaurants', key: 'restaurant_id' },
        onDelete: 'CASCADE'
      },
      name: { type: Sequelize.STRING, allowNull: false },
      ingredients: { type: Sequelize.TEXT },
      image: { type: Sequelize.STRING },
      price: { type: Sequelize.FLOAT, allowNull: false },
      description: { type: Sequelize.TEXT },
      category: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Dishes');
  }
};
