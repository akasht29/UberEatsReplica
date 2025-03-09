'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Carts', {
      cart_id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      customer_id: { 
        type: Sequelize.INTEGER, 
        references: {
          model: 'Customers', // assuming 'Customers' table name
          key: 'customer_id'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      dish_id: { 
        type: Sequelize.INTEGER, 
        references: {
          model: 'Dishes', // assuming 'Dishes' table name
          key: 'dish_id'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Restaurants',
          key: 'restaurant_id'
        }
      },
      quantity: { 
        type: Sequelize.INTEGER, 
        defaultValue: 1, 
        allowNull: false 
      },
      price: { 
        type: Sequelize.FLOAT, 
        allowNull: false 
      },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Carts');
  }
};
