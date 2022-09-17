'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      payment.hasMany(models.sale, {
        foreignKey: "payments_id",
        as: "sales",
      });
    }
  }
  payment.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'payment',
  });
  return payment;
};