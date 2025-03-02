'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      order_id: { 
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
      status: { 
        type: Sequelize.ENUM('New', 'Preparing', 'On the Way', 'Pick-up Ready', 'Delivered', 'Picked Up', 'Cancelled'),
        defaultValue: 'New'
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};
