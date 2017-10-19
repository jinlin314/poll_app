const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password_hashed: DataTypes.STRING,// This column stores the hashed password in the DB, via the beforeCreate/beforeUpdate hooks
    password: DataTypes.VIRTUAL, // Note that this is a virtual, and not actually stored in DB
  }, {
    indexes: [{fields: ['email'], unique: true}],
    hooks: {
      beforeCreate: setEmailAndPassword,
      beforeUpdate: setEmailAndPassword,
    },
    defaultScope: {
      attributes: {exclude: ['password_digest']}
    }
  })

  Users.associate = function (models) {
    // user voting record will be stored in 'User_choice' table
    Users.belongsToMany(models.Poll_option_detail, {through: 'User_choices'})
  }

  // This method is a Promisified bcrypt.compare
  Users.prototype.authenticate = function(plaintext) {
    return bcrypt.compare(plaintext, this.password_hashed)
  }
  return Users;
}

function setEmailAndPassword(user) {
  user.email = user.email && user.email.toLowerCase()
  if (!user.password) return Promise.resolve(user)

  return bcrypt.hash(user.get('password'), 10)
    .then(hash => {
      user.set('password_hashed', hash)
    })
}
