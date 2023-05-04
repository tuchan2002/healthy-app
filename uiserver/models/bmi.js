"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BMI extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'user_id', onDelete: 'cascade', onUpdate: 'cascade'});
    }
  }
  BMI.init(
    {
      user_id: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
      height: DataTypes.INTEGER,
      value: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "BMI",
      tableName: "bmis",
    },
  );
  return BMI;
};
