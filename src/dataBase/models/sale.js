'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // define association here
     
      sale.belongsTo(models.payment, {
        foreignKey: "payments_id",
        as: "payment",
      });

      sale.belongsTo(models.Product, {
        foreignKey: "products_id",
        as: "Product",
      });

      sale.belongsTo(models.User, {
        foreignKey: "users_id",
        as: "users",
      });
    }
  }
  sale.init({
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    ticket_number: DataTypes.STRING,
    payments_id: DataTypes.INTEGER,
    products_id: DataTypes.INTEGER,
    users_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'sale',
  });
  return sale;
};