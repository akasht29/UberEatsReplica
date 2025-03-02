module.exports = (sequelize, DataTypes) => {
    const Favorite = sequelize.define("Favorite", {
        favorite_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }
    });

    Favorite.associate = (models) => {
        Favorite.belongsTo(models.Customer, { foreignKey: "customer_id", onDelete: "CASCADE" });
        Favorite.belongsTo(models.Restaurant, { foreignKey: "restaurant_id", onDelete: "CASCADE" });
    };

    return Favorite;
};
