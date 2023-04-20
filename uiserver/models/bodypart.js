'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bodypart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Video, Video_Bodypart}) {
      // define association here
      this.belongsToMany(Video, {foreignKey: 'bodypart_id', otherKey: "video_id", through: Video_Bodypart, as: "videos"});
    }
  }
  Bodypart.init({
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bodypart',
    tableName: 'bodyparts'
  });
  return Bodypart;
};