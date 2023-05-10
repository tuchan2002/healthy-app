'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Location.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    runningInfoId: DataTypes.INTEGER,
    longitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT,
    speed: DataTypes.FLOAT,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
  }, {
    sequelize,
    modelName: 'Location',
    tableName: 'locations',
    updatedAt: false,
  });
  return Location;
};