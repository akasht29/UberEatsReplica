module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define("Customer", {
        customer_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, unique: true, allowNull: false },
        password_hash: { type: DataTypes.STRING, allowNull: false },
        profile_picture: { type: DataTypes.STRING },
        country: { type: DataTypes.STRING },
        state: { type: DataTypes.STRING(10) }
    });

    Customer.associate = (models) => {
        Customer.hasMany(models.Order, { foreignKey: "customer_id" });
        Customer.hasMany(models.Favorite, { foreignKey: "customer_id" });
    };

    return Customer;
};
