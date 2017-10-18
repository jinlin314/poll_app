// this 'poll_option_detail' table is created automatically when you set up the
// polls and options many-to-many relationship. However, if you want this table to
// store additional infos, such as votes count for each option, you can explicity define
// the addition colomns in the model. See below: 
module.exports = (sequelize, DataTypes) => {
  var poll_option_detail = sequelize.define('poll_option_detail', {
    votes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
  return poll_option_detail;
};
