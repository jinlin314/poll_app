module.exports = (sequelize, DataTypes) => {
  var Polls = sequelize.define('Polls', {
    question: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
  hooks: {
    // HOUSE KEEPING!!!
    // if you want to delete a poll, you also want to delete all its remaining details
    // in the 'poll_option_detail' table, a 'beforeDestroy' hook will be invoked when we try
    // to destroy a poll. It will destroy targeted poll's details in the 'poll_option_detail' table,
    // then delete delete the targetd poll.
    beforeDestroy: function(poll){
      return models.poll_option_detail.destroy({
        where: {
          PollId: poll.id
        }
      });
    }
  }
});

  Polls.associate = function (models) {
    // since poll and options are many-to-many relationship,
    // "through" will create an join table name 'poll_option_detail'
    Polls.belongsToMany(models.PollOptions, {through: 'Poll_option_detail'});
    Polls.belongsTo(models.Users);
  };
  return Polls;
};
