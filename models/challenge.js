"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Challenge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Challenge.belongsTo(models.User);
      Challenge.hasMany(models.Submission);
    }
  }
  Challenge.init(
    {
      name: DataTypes.STRING,
      brief: DataTypes.STRING,
      budget: DataTypes.INTEGER,
      deadline: DataTypes.DATE,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Challenge",
    }
  );
  return Challenge;
};
