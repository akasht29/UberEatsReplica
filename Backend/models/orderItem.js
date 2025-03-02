module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define("OrderItem", {
        order_item_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
    });

    OrderItem.associate = (models) => {
        OrderItem.belongsTo(models.Order, { foreignKey: "order_id", onDelete: "CASCADE" });
        OrderItem.belongsTo(models.Dish, { foreignKey: "dish_id", onDelete: "CASCADE" });
    };

    return OrderItem;
};
