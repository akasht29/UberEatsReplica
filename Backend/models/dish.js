module.exports = (sequelize, DataTypes) => {
    const Dish = sequelize.define("Dish", {
        dish_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        ingredients: { type: DataTypes.TEXT },
        image: { type: DataTypes.STRING },
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        description: { type: DataTypes.TEXT },
        category: { 
            type: DataTypes.ENUM("Appetizer", "Salad", "Main Course", "Dessert", "Beverage"),
            allowNull: false
        }
    });

    Dish.associate = (models) => {
        Dish.belongsTo(models.Restaurant, { foreignKey: "restaurant_id", onDelete: "CASCADE" });
        Dish.hasMany(models.Cart, { foreignKey: 'dish_id' });
    };

    return Dish;
};
