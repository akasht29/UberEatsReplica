'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Order_Items', {
      order_item_id: { 
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
      },
      order_id: { 
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: { model: 'Orders', key: 'order_id' },
        onDelete: 'CASCADE'
      },
      dish_id: { 
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: { model: 'Dishes', key: 'dish_id' },
        onDelete: 'CASCADE'
      },
      quantity: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
      price: { type: Sequelize.FLOAT, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Order_Items');
  }
};
