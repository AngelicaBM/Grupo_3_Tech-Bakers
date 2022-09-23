'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     
      this.belongsTo(models.Voucher);
      this.belongsTo(models.User);
    }
  }
  discount.init({
    userId: DataTypes.INTEGER,
    voucherId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'discount',
  });
  return discount;
};