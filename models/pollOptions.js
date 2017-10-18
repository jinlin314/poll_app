module.exports = (sequelize, DataTypes) => {
  var PollOptions = sequelize.define('PollOptions', {
    text: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  PollOptions.associate = function (models) {
    // since poll and options are many-to-many relationship, 
    // "through" will create an join table name 'poll_option_detail'
    PollOptions.belongsToMany(models.Polls, {through: 'Poll_option_detail'});
  };
  return PollOptions;
};
