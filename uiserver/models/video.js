"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Bodypart, Target, Video_Bodypart, Video_Target }) {
      // define association here
      this.belongsToMany(Bodypart, {
        foreignKey: "video_id",
        otherKey: "bodypart_id",
        as: "bodyparts",
        through: Video_Bodypart,
      });
      this.belongsToMany(Target, {
        foreignKey: "video_id",
        otherKey: "target_id",
        as: "targets",
        through: Video_Target,
      });
    }
  }
  Video.init(
    {
      title: DataTypes.STRING,
      link: DataTypes.STRING,
      duration: DataTypes.TIME,
      kalo: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Video",
      tableName: 'videos',
    }
  );
  return Video;
};
