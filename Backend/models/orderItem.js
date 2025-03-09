module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('OrderItem', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      order_id: { type: DataTypes.INTEGER, allowNull: false },
      dish_id: { type: DataTypes.INTEGER, allowNull: false },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
      price: { type: DataTypes.FLOAT, allowNull: false }
    });
  
    OrderItem.associate = (models) => {
      OrderItem.belongsTo(models.Order, { foreignKey: 'order_id' });
      OrderItem.belongsTo(models.Dish, { foreignKey: 'dish_id' });
    };
  
    return OrderItem;
  };
  