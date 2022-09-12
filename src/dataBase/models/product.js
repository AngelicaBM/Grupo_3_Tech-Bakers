'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: "categories_id",
        as: "category",
      });
      
      Product.belongsTo(models.Type, {
        foreignKey: "types_id",
        as: "type",
      });

      Product.hasMany(models.Image, {
        foreignKey: "products_id",
        as: "images",
      });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    types_id: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    discount: DataTypes.DECIMAL,
    description: DataTypes.TEXT,
    stock: DataTypes.INTEGER,
    categories_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};