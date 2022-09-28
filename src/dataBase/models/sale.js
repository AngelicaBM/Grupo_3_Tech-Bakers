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
     
      this.belongsTo(models.payment);
      this.belongsTo(models.Product);
      this.belongsTo(models.User);
    }
  }
  sale.init({
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    ticket_number: DataTypes.STRING,
    paymentId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'sale',
  });
  return sale;
};