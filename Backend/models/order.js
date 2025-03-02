module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
        order_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        order_status: { 
            type: DataTypes.ENUM("Order Received", "Preparing", "On the Way", "Pick-up Ready", "Delivered", "Picked Up", "Cancelled"), 
            defaultValue: "Order Received"
        },
        order_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    });

    Order.associate = (models) => {
        Order.belongsTo(models.Customer, { foreignKey: "customer_id", onDelete: "CASCADE" });
        Order.belongsTo(models.Restaurant, { foreignKey: "restaurant_id", onDelete: "CASCADE" });
        Order.hasMany(models.OrderItem, { foreignKey: "order_id" });
    };

    return Order;
};
