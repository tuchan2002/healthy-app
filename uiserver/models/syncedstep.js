'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SyncedStep extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SyncedStep.init({
    id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    value: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'SyncedStep',
    tableName: 'syncedsteps'
  });
  return SyncedStep;
};