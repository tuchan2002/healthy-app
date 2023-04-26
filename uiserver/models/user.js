"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ BMI, UserTarget, UserTargetState, FootStep }) {
      this.hasOne(BMI, { foreignKey: "user_id" });
      this.hasOne(UserTarget, { foreignKey: "user_id" });
      this.hasMany(UserTargetState, { foreignKey: "user_id" });
      this.hasMany(FootStep, { foreignKey: "user_id" });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING,
      uid: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    },
  );
  return User;
};
