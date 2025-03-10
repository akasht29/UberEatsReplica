'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Customers', // Make sure the customers table exists
          key: 'customer_id',
        },
        onDelete: 'CASCADE', // Optional: if a customer is deleted, delete their orders
      },
      restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Restaurants', // Make sure the customers table exists
          key: 'restaurant_id',
        },
        onDelete: 'CASCADE', // Optional: if a customer is deleted, delete their orders
      },
      total_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Pending', // Default status when order is created
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  },
};
