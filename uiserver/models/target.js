'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Target extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Video, Video_Target}) {
      // define association here
      this.belongsToMany(Video, {foreignKey: 'target_id', otherKey: "video_id", through: Video_Target, as: "videos"});
    }
  }
  Target.init({
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Target',
    tableName: 'targets'
  });
  return Target;
};