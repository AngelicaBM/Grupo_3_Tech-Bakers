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
      sale.belongsTo(models.Product, {
        as: "product",
        foreignKey: "productId"
      })

      sale.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId"
      })
    }
  }
  sale.init({
    productId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sale',
  });
  return sale;
};