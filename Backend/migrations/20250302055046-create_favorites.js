'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Favorites', {
      favorite_id: { 
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
      },
      customer_id: { 
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: { model: 'Customers', key: 'customer_id' },
        onDelete: 'CASCADE'
      },
      restaurant_id: { 
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: { model: 'Restaurants', key: 'restaurant_id' },
        onDelete: 'CASCADE'
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Favorites');
  }
};
