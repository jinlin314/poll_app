// const models = require('../models');
module.exports = (sequelize, DataTypes) => {
  var Polls = sequelize.define('Polls', {
    question: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Polls.associate = function (models) {
    Polls.hasMany(models.PollOptions);
  };
  return Polls;
};
