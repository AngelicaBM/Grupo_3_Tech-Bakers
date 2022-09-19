'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      photo.belongsTo(models.Product, {
        foreignKey: "userId",
        as: "users",
      });
    }
  }
  photo.init({
    name: DataTypes.STRING,
    userIid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'photo',
  });
  return photo;
};