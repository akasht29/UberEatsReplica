module.exports = (sequelize, DataTypes) => { 
    const Cart = sequelize.define("Cart", { 
        cart_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        restaurant_id: { type: DataTypes.INTEGER, references: { model: "Restaurants", key: "restaurant_id" }, onDelete: "CASCADE", allowNull: false }, 
        customer_id: { type: DataTypes.INTEGER, references: { model: "Customers", key: "customer_id" }, onDelete: "CASCADE", allowNull: false }, 
        dish_id: { type: DataTypes.INTEGER, references: { model: "Dishes", key: "dish_id" }, onDelete: "CASCADE", allowNull: false }, 
        quantity: { type: DataTypes.INTEGER, defaultValue: 1, allowNull: false }, 
        price: { type: DataTypes.FLOAT, allowNull: false }, 
        createdAt: DataTypes.DATE, 
        updatedAt: DataTypes.DATE 
    }); 

    Cart.associate = (models) => { 
        Cart.belongsTo(models.Customer, { foreignKey: "customer_id" }); 
        Cart.belongsTo(models.Dish, { foreignKey: "dish_id" }); 
        Cart.belongsTo(models.Restaurant, { foreignKey: 'restaurant_id' });
    };

    return Cart; 
};
