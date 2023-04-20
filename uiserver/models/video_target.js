'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video_Target extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Video_Target.init({
    video_id: DataTypes.INTEGER,
    target_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Video_Target',
    tableName: 'video_target'
  });
  return Video_Target;
};