"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserTargetState extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({}) {
      // define association here
    }
  }
  UserTargetState.init(
    {
      user_id: DataTypes.INTEGER,
      usertarget_id: DataTypes.INTEGER,
      gotUpAt: DataTypes.DATE,
      sleepedAt: DataTypes.DATE,
      kcal: DataTypes.INTEGER,
      footsteps_amount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserTargetState",
      tableName: "usertarget_states",
    },
  );
  return UserTargetState;
};
