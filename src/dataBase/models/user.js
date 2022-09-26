'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // define association here
     
      this.belongsTo(models.Role);

      this.hasMany(models.Photo);
    }
  }
  User.init({
    fullname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    phonenumber: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    password: DataTypes.STRING,
    terms: DataTypes.STRING,
    roleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};