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
      this.belongsTo(models.Category);
      this.belongsTo(models.Type);

      this.hasMany(models.Image);
      this.belongsToMany(models.User, {
        as: "users",
        through: "Sale",
        foreignKey: "productId",
        otherKey: "userId"
      })
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    discount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: null
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};