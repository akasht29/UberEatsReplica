module.exports = (sequelize, DataTypes) => {
    const Restaurant = sequelize.define("Restaurant", {
        restaurant_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        restaurant_name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, unique: true, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        location: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT },
        contact_info: { type: DataTypes.STRING },
        images: { type: DataTypes.STRING },
        timings: { type: DataTypes.STRING }
    });

    Restaurant.associate = (models) => {
        Restaurant.hasMany(models.Dish, { foreignKey: "restaurant_id" });
        Restaurant.hasMany(models.Order, { foreignKey: "restaurant_id" });
        Restaurant.hasMany(models.Favorite, { foreignKey: "restaurant_id" });
        Restaurant.hasMany(models.Cart, { foreignKey: 'restaurant_id' });
    };

    return Restaurant;
};
