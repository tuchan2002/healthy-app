'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RunningInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Location}) {
      // define association here
      this.hasMany(Location, {as: "locations", foreignKey: "runningInfoId"})
    }
  }
  RunningInfo.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: DataTypes.INTEGER,
    target: DataTypes.INTEGER,
    isStarted: DataTypes.BOOLEAN,
    isStopped: DataTypes.BOOLEAN,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATEONLY
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATEONLY
    }
  }, {
    sequelize,
    modelName: 'RunningInfo',
    tableName: 'running_infos'
  });
  return RunningInfo;
};