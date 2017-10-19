// this 'poll_option_detail' table is created automatically when you set up the
// polls and options many-to-many relationship. However, if you want this table to
// store additional infos, such as votes count for each option, you can explicity define
// the addition colomns in the model. See below: 
module.exports = (sequelize, DataTypes) => {
  var Poll_option_detail = sequelize.define('Poll_option_detail', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    votes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  Poll_option_detail.associate = function (models) {
    // user voting record will be stored in 'User_choice' table
    Poll_option_detail.belongsToMany(models.Users, {through: "User_choices"})
  };
  return Poll_option_detail;
};
