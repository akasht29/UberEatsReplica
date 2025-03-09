module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      customer_id: { type: DataTypes.INTEGER, allowNull: false },
      total_price: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0.0 },
      restaurant_id: { type: DataTypes.INTEGER, allowNull: false },
      status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Pending' }
    });
  
    Order.associate = (models) => {
      Order.belongsTo(models.Customer, { foreignKey: 'customer_id' });
      Order.belongsTo(models.Restaurant, { foreignKey: 'restaurant_id' });
      Order.hasMany(models.OrderItem, { foreignKey: 'order_id' });
    };
  
    return Order;
  };
  