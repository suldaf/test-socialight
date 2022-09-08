"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Submission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Submission.belongsTo(models.User);
      Submission.belongsTo(models.Challenge);
    }
  }
  Submission.init(
    {
      post_url: DataTypes.STRING,
      status: DataTypes.STRING,
      view_count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Submission",
    }
  );
  return Submission;
};
