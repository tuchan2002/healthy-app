'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video_Bodypart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Video_Bodypart.init({
    video_id: DataTypes.INTEGER,
    bodypart_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Video_Bodypart',
    tableName: 'video_bodypart',
  });
  return Video_Bodypart;
};