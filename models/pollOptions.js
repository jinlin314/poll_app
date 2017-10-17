// const models = require('../models');
module.exports = (sequelize, DataTypes) => {
  var PollOptions = sequelize.define('PollOptions', {
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    votes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  // PollOptions.associate = function (models) {
  //   PollOptions.belongsTo(models.Polls, {as: 'polls'});
  // };
  return PollOptions;
};
