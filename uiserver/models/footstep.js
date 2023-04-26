"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FootStep extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({}) {
      // define association here
    }
  }
  FootStep.init(
    {
      user_id: DataTypes.INTEGER,
      usertarget_state_id: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "FootStep",
      tableName: "footsteps",
    },
  );
  return FootStep;
};
