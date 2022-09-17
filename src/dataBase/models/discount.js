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
      /**discount.belongsToMany(models.Discount, {
        as: 'discounts',
        throught: 'user_voucher',
        foreignKey: "user_id",
        otherKey: "voucher_id",
        timestamps: false,
      });*/
    }
  }
  discount.init({
    users_id: DataTypes.INTEGER,
    voucher_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'discount',
  });
  return discount;
};